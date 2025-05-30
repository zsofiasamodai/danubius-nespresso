export interface Employee {
  id: string;
  name: string;
}

export interface Capsule {
  id: string;
  name: string;
  intensity?: number;
  price: number;
  imageUrl: string;
  category: 'original' | 'vertuo';
}

export interface EmployeeOrder {
  employeeId: string;
  items: OrderItem[];
}

export interface OrderItem {
  capsuleId: string;
  quantity: number;
}

export interface OrderSummaryByType {
  capsuleId: string;
  capsuleName: string;
  price: number;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderSummaryByEmployee {
  employeeId: string;
  employeeName: string;
  items: {
    capsuleId: string;
    capsuleName: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  totalPrice: number;
}