import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Capsule } from '../types';
import { useOrder } from '../context/OrderContext';

interface CapsuleQuantitySelectorProps {
  capsule: Capsule;
  employeeId: string;
  quantity: number;
}

const CapsuleQuantitySelector: React.FC<CapsuleQuantitySelectorProps> = ({
  capsule,
  employeeId,
  quantity
}) => {
  const { updateOrder } = useOrder();

  const handleIncrement = () => {
    if (quantity < 100) {
      updateOrder(employeeId, capsule.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateOrder(employeeId, capsule.id, quantity - 1);
    }
  };

  const handleClear = () => {
    updateOrder(employeeId, capsule.id, 0);
  };

  return (
    <div className={`flex items-center p-2 rounded-lg border ${quantity > 0 ? 'border-amber-200 bg-amber-50' : 'border-gray-200'} transition-all duration-200`}>
      <div className="flex-shrink-0 w-12 h-12 mr-3">
        <img
          src={capsule.imageUrl}
          alt={capsule.name}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{capsule.name}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            {capsule.intensity && `Intensity: ${capsule.intensity} · `}
            {capsule.price} HUF
          </span>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className={`p-1 rounded ${quantity === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Minus size={14} />
            </button>
            
            <input
              type="number"
              min="0"
              max="100"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 0 && val <= 100) {
                  updateOrder(employeeId, capsule.id, val);
                }
              }}
              className="w-10 h-6 text-center text-sm border border-gray-200 rounded"
            />
            
            <button
              onClick={handleIncrement}
              disabled={quantity === 100}
              className={`p-1 rounded ${quantity === 100 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Plus size={14} />
            </button>
            
            {quantity > 0 && (
              <button
                onClick={handleClear}
                className="p-1 rounded text-red-500 hover:bg-red-50"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleQuantitySelector;