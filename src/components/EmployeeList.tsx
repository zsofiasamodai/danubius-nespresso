import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save, X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import EmployeeOrderForm from './EmployeeOrderForm';

const EmployeeList: React.FC = () => {
  const { employees, updateEmployeeName } = useOrder();
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const toggleEmployee = (employeeId: string) => {
    setExpandedEmployeeId(expandedEmployeeId === employeeId ? null : employeeId);
  };

  const startEditing = (employeeId: string, name: string) => {
    setEditingEmployeeId(employeeId);
    setEditingName(name);
  };

  const saveEmployeeName = (employeeId: string) => {
    updateEmployeeName(employeeId, editingName);
    setEditingEmployeeId(null);
  };

  const cancelEditing = () => {
    setEditingEmployeeId(null);
  };

  return (
    <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
      {employees.map((employee) => (
        <div 
          key={employee.id} 
          className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleEmployee(employee.id)}
          >
            <div className="flex items-center gap-3 flex-1">
              {editingEmployeeId === employee.id ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border-gray-300 rounded p-1 flex-1"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <span className="font-medium text-gray-800">{employee.name}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {editingEmployeeId === employee.id ? (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEmployeeName(employee.id);
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Save size={18} className="text-green-600" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelEditing();
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={18} className="text-red-500" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(employee.id, employee.name);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Edit2 size={16} className="text-gray-500" />
                </button>
              )}
              {expandedEmployeeId === employee.id ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </div>
          
          {expandedEmployeeId === employee.id && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-2">
              <EmployeeOrderForm employeeId={employee.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;