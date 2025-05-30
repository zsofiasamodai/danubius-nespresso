import React, { useState } from 'react';
import { Coffee, User } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import SummaryByType from './SummaryByType';
import SummaryByEmployee from './SummaryByEmployee';

const OrderSummary: React.FC = () => {
  const { getOrderSummaryByType, getOrderSummaryByEmployee, getTotalOrderPrice } = useOrder();
  const [activeTab, setActiveTab] = useState<'type' | 'employee'>('type');
  
  const summaryByType = getOrderSummaryByType();
  const summaryByEmployee = getOrderSummaryByEmployee();
  const totalPrice = getTotalOrderPrice();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
            activeTab === 'type'
              ? 'bg-amber-50 text-amber-900 border-b-2 border-amber-500'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('type')}
        >
          <Coffee size={16} className="mr-2" />
          By Coffee Type
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
            activeTab === 'employee'
              ? 'bg-amber-50 text-amber-900 border-b-2 border-amber-500'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('employee')}
        >
          <User size={16} className="mr-2" />
          By Employee
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'type' ? (
          <SummaryByType summaryData={summaryByType} />
        ) : (
          <SummaryByEmployee summaryData={summaryByEmployee} />
        )}
        
        {(summaryByType.length > 0 || summaryByEmployee.length > 0) && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Total Order Price:</span>
              <span className="text-xl font-bold text-amber-800">{totalPrice.toLocaleString()} HUF</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;