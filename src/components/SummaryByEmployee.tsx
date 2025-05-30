import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrderSummaryByEmployee } from '../types';

interface SummaryByEmployeeProps {
  summaryData: OrderSummaryByEmployee[];
}

const SummaryByEmployee: React.FC<SummaryByEmployeeProps> = ({ summaryData }) => {
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);

  const toggleEmployee = (employeeId: string) => {
    setExpandedEmployeeId(expandedEmployeeId === employeeId ? null : employeeId);
  };

  if (summaryData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No orders yet. Start by adding capsules to employee orders.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {summaryData.map((employeeSummary) => (
        <div key={employeeSummary.employeeId} className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => toggleEmployee(employeeSummary.employeeId)}
          >
            <div className="font-medium">{employeeSummary.employeeName}</div>
            <div className="flex items-center gap-3">
              <div className="text-amber-800 font-medium">{employeeSummary.totalPrice.toLocaleString()} HUF</div>
              {expandedEmployeeId === employeeSummary.employeeId ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </div>
          </div>

          {expandedEmployeeId === employeeSummary.employeeId && (
            <div className="p-3 border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Capsule
                    </th>
                    <th className="px-3 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-3 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-3 py-2 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {employeeSummary.items.map((item) => (
                    <tr key={item.capsuleId} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm text-gray-900">{item.capsuleName}</td>
                      <td className="px-3 py-2 text-sm text-gray-500 text-right">{item.price} HUF</td>
                      <td className="px-3 py-2 text-sm text-gray-500 text-right">{item.quantity}</td>
                      <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                        {item.totalPrice.toLocaleString()} HUF
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryByEmployee;