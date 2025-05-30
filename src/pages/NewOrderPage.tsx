import React from 'react';
import EmployeeList from '../components/EmployeeList';
import OrderSummary from '../components/OrderSummary';

const NewOrderPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;