import React from 'react';
import { Trash2 } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import CapsuleQuantitySelector from './CapsuleQuantitySelector';

interface EmployeeOrderFormProps {
  employeeId: string;
}

const EmployeeOrderForm: React.FC<EmployeeOrderFormProps> = ({ employeeId }) => {
  const { capsules, orders, removeEmployeeOrder } = useOrder();
  
  // Get this employee's current order
  const employeeOrder = orders.find(order => order.employeeId === employeeId);
  
  // Group capsules by category
  const originalCapsules = capsules.filter(capsule => capsule.category === 'original');
  const vertuoCapsules = capsules.filter(capsule => capsule.category === 'vertuo');
  
  // Calculate total for this employee
  const getEmployeeTotal = () => {
    if (!employeeOrder) return 0;
    
    return employeeOrder.items.reduce((total, item) => {
      const capsule = capsules.find(c => c.id === item.capsuleId);
      if (!capsule) return total;
      return total + (capsule.price * item.quantity);
    }, 0);
  };

  const handleRemoveOrder = () => {
    removeEmployeeOrder(employeeId);
  };

  const getQuantity = (capsuleId: string) => {
    if (!employeeOrder) return 0;
    const orderItem = employeeOrder.items.find(item => item.capsuleId === capsuleId);
    return orderItem?.quantity || 0;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">Select Capsules</h3>
        {employeeOrder && (
          <button 
            onClick={handleRemoveOrder}
            className="text-red-600 text-sm flex items-center hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} className="mr-1" /> Remove Order
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-2 pb-1 border-b border-gray-200">Original Line</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {originalCapsules.map(capsule => (
              <CapsuleQuantitySelector 
                key={capsule.id}
                capsule={capsule}
                employeeId={employeeId}
                quantity={getQuantity(capsule.id)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-2 pb-1 border-b border-gray-200">Vertuo Line</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vertuoCapsules.map(capsule => (
              <CapsuleQuantitySelector 
                key={capsule.id}
                capsule={capsule}
                employeeId={employeeId}
                quantity={getQuantity(capsule.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {employeeOrder && employeeOrder.items.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
          <div className="text-right">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="ml-2 font-medium">{getEmployeeTotal().toLocaleString()} HUF</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeOrderForm;