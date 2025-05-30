
import { CoffeeIcon } from 'lucide-react';
import { OrderProvider } from './context/OrderContext';
import OrderOverview from './pages/OrderOverview';

function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-amber-800 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CoffeeIcon size={24} />
                <h1 className="text-xl font-semibold">Nespresso Order Manager</h1>
              </div>
              <div className="text-sm bg-amber-700 py-1 px-3 rounded-full">
                Company Coffee Orders
              </div>
            </div>
          </div>
        </header>
        
        <main>
          <OrderOverview />
        </main>
        
        <footer className="bg-gray-100 border-t border-gray-200 mt-8">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Nespresso Order Manager | Company Coffee Management
            </div>
          </div>
        </footer>
      </div>
    </OrderProvider>
  );
}

export default App;