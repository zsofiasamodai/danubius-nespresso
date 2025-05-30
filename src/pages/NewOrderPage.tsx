import { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import OrderSummary from '../components/OrderSummary';

const NewOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<string[]>([]); // List of orders
  const [currentOrder, setCurrentOrder] = useState<string | null>(null); // Current order being edited
  const [isEditing, setIsEditing] = useState(false); // Whether the form is open

  const handleNewOrder = () => {
    setCurrentOrder('');
    setIsEditing(true);
  };

  const handleSaveOrder = () => {
    if (currentOrder) {
      setOrders([...orders, currentOrder]);
    }
    setIsEditing(false);
    setCurrentOrder(null);
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

      {isEditing && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Order Details</h2>
          <textarea
            value={currentOrder || ''}
            onChange={(e) => setCurrentOrder(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            placeholder="Enter order details..."
          />
          <button
            onClick={handleSaveOrder}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Save Order
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Employee Orders</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Select an employee to expand their panel and add coffee capsules to their order.
              You can edit employee names by clicking the edit icon.
            </p>
            <EmployeeList />
          </div>
        </div>

        <div>
          <div className="sticky top-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
            <OrderSummary />
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Orders List</h3>
              <ul className="list-disc pl-5">
                {orders.map((order, index) => (
                  <li key={index} className="text-gray-700">
                    {order}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;