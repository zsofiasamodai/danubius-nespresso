import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createOrder } from './BusinessLogic/OrderService';

type EmployeeOrder = {
  employeeName: string;
  coffeeQuantity: number;
};

export type Order = {
  id: string;
  employees: EmployeeOrder[];
};

const app = express();
const PORT = 4000;

// In-memory "database"
let orders: Order[] = [];

app.use(cors());
app.use(bodyParser.json());

// Get all orders
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(orders);
});

// Create a new order
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const order = createOrder(req);
    orders.push(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update an order
app.put('/api/orders/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    orders[idx] = { ...req.body, id };
    res.status(200).json(orders[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});