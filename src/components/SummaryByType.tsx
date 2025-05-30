import React from 'react';
import { OrderSummaryByType } from '../types';

interface SummaryByTypeProps {
  summaryData: OrderSummaryByType[];
}

const SummaryByType: React.FC<SummaryByTypeProps> = ({ summaryData }) => {
  if (summaryData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No orders yet. Start by adding capsules to employee orders.
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Capsule Name
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {summaryData.map((item) => (
            <tr key={item.capsuleId} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{item.capsuleName}</td>
              <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.price} HUF</td>
              <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.totalQuantity}</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{item.totalPrice.toLocaleString()} HUF</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryByType;