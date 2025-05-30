import { createContext, ReactNode, useContext, useState } from 'react';
import { Capsule, EmployeeOrder, OrderSummaryByEmployee, OrderSummaryByType } from '../types';
import { mockCapsules, mockEmployees } from '../data/mockData';

interface OrderContextType {
  employees: typeof mockEmployees;
  capsules: typeof mockCapsules;
  orders: EmployeeOrder[];
  updateEmployeeName: (id: string, name: string) => void;
  updateOrder: (employeeId: string, capsuleId: string, quantity: number) => void;
  removeEmployeeOrder: (employeeId: string) => void;
  getOrderSummaryByType: () => OrderSummaryByType[];
  getOrderSummaryByEmployee: () => OrderSummaryByEmployee[];
  getTotalOrderPrice: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [capsules] = useState(mockCapsules);
  const [orders, setOrders] = useState<EmployeeOrder[]>([]);

  const updateEmployeeName = (id: string, name: string) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, name } : emp))
    );
  };

  const updateOrder = (employeeId: string, capsuleId: string, quantity: number) => {
    setOrders((prevOrders) => {
      // Find if this employee already has an order
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.employeeId === employeeId
      );

      if (existingOrderIndex === -1 && quantity > 0) {
        // Create new order for this employee
        return [
          ...prevOrders,
          {
            employeeId,
            items: [{ capsuleId, quantity }],
          },
        ];
      } else if (existingOrderIndex >= 0) {
        // Update existing order
        const updatedOrders = [...prevOrders];
        const existingOrder = updatedOrders[existingOrderIndex];
        
        const existingItemIndex = existingOrder.items.findIndex(
          (item) => item.capsuleId === capsuleId
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          if (quantity > 0) {
            existingOrder.items[existingItemIndex].quantity = quantity;
          } else {
            // Remove item if quantity is 0
            existingOrder.items = existingOrder.items.filter(
              (item) => item.capsuleId !== capsuleId
            );
          }
        } else if (quantity > 0) {
          // Add new item
          existingOrder.items.push({ capsuleId, quantity });
        }

        // Remove employee's order entirely if no items left
        if (existingOrder.items.length === 0) {
          return updatedOrders.filter((order) => order.employeeId !== employeeId);
        }

        return updatedOrders;
      }

      return prevOrders;
    });
  };

  const removeEmployeeOrder = (employeeId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.employeeId !== employeeId)
    );
  };

  const getOrderSummaryByType = (): OrderSummaryByType[] => {
    const summary: Record<string, OrderSummaryByType> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const capsule = capsules.find((c) => c.id === item.capsuleId);
        if (!capsule) return;

        if (!summary[item.capsuleId]) {
          summary[item.capsuleId] = {
            capsuleId: item.capsuleId,
            capsuleName: capsule.name,
            price: capsule.price,
            totalQuantity: 0,
            totalPrice: 0,
          };
        }

        summary[item.capsuleId].totalQuantity += item.quantity;
        summary[item.capsuleId].totalPrice += item.quantity * capsule.price;
      });
    });

    return Object.values(summary);
  };

  const getOrderSummaryByEmployee = (): OrderSummaryByEmployee[] => {
    return orders.map((order) => {
      const employee = employees.find((e) => e.id === order.employeeId);
      if (!employee) throw new Error(`Employee not found: ${order.employeeId}`);

      const items = order.items.map((item) => {
        const capsule = capsules.find((c) => c.id === item.capsuleId);
        if (!capsule) throw new Error(`Capsule not found: ${item.capsuleId}`);

        return {
          capsuleId: item.capsuleId,
          capsuleName: capsule.name,
          quantity: item.quantity,
          price: capsule.price,
          totalPrice: item.quantity * capsule.price,
        };
      });

      const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        employeeId: order.employeeId,
        employeeName: employee.name,
        items,
        totalPrice,
      };
    });
  };

  const getTotalOrderPrice = (): number => {
    return getOrderSummaryByEmployee().reduce((sum, emp) => sum + emp.totalPrice, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        employees,
        capsules,
        orders,
        updateEmployeeName,
        updateOrder,
        removeEmployeeOrder,
        getOrderSummaryByType,
        getOrderSummaryByEmployee,
        getTotalOrderPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};