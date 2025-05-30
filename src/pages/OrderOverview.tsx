import { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import OrderSummary from '../components/OrderSummary';

// Define the shape of an order
type EmployeeOrder = {
  employeeName: string;
  coffeeQuantity: number;
};

type Order = {
  id: string;
  employees: EmployeeOrder[];
};

const createEmptyOrder = (): Order => ({
  id: Date.now().toString(),
  employees: [],
});

const OrderOverview: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

// GET /api/orders endpoint
function getOrders() {
    // This function would typically fetch orders from a backend API
    // For now, we return an empty array to simulate no orders
    fetch('http://localhost:4000/api/orders')
    .then(response => response.json())
    .then(data => {
        setOrders(data);
    })
}

getOrders();

  const handleNewOrder = () => {
    setCurrentOrder(createEmptyOrder());
    setIsEditing(true);
    setEditingOrderId(null);
  };

  const handleEditOrder = (order: Order) => {
    setCurrentOrder({ ...order });
    setIsEditing(true);
    setEditingOrderId(order.id);
  };

  const handleSaveOrder = () => {
    if (!currentOrder) return;
    if (editingOrderId) {
      // Update existing order
      setOrders(orders.map(o => o.id === editingOrderId ? currentOrder : o));
    } else {
      // Add new order
      setOrders([...orders, currentOrder]);
    }
    setIsEditing(false);
    setCurrentOrder(null);
    setEditingOrderId(null);
  };

  // Update employee orders in the current order
  const handleEmployeeOrdersChange = (employees: EmployeeOrder[]) => {
    if (currentOrder) {
      setCurrentOrder({ ...currentOrder, employees });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={handleNewOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          New Order
        </button>
      </div>

      {isEditing && currentOrder && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            {editingOrderId ? 'Edit Order' : 'Order Details'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EmployeeList
                employees={currentOrder.employees}
                onChange={handleEmployeeOrdersChange}
              />
            </div>
            <div>
              <OrderSummary employees={currentOrder.employees} />
              <button
                onClick={handleSaveOrder}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mt-4"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Orders List</h3>
        <ul className="list-disc pl-5">
          {orders.map((order) => (
            <li key={order.id} className="text-gray-700 flex items-center gap-2">
              Order #{order.id} – {order.employees.length} employees,{' '}
              {order.employees.reduce((sum, e) => sum + e.coffeeQuantity, 0)} coffees
              <button
                onClick={() => handleEditOrder(order)}
                className="ml-2 text-blue-500 underline text-sm"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderOverview;

