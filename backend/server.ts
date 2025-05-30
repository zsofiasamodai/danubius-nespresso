import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

type EmployeeOrder = {
  employeeName: string;
  coffeeQuantity: number;
};

type Order = {
  id: string;
  employees: EmployeeOrder[];
};

const app = express();
const PORT = 4000;

// In-memory "database"
let orders: Order[] = [
    {
        id: '1',
        employees: [
        { employeeName: 'Alice', coffeeQuantity: 5 },
        { employeeName: 'Bob', coffeeQuantity: 3 }
        ]
    },
    {
        id: '2',
        employees: [
        { employeeName: 'Charlie', coffeeQuantity: 2 }
        ]
    } 
];


app.use(cors());
app.use(bodyParser.json());

// Get all orders
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(orders);
});

// Create a new order
app.post('/api/orders', (req: Request, res: Response) => {
  const order: Order = { ...req.body, id: Date.now().toString() };
  orders.push(order);
  res.status(201).json(order);
});

// Update an order
app.put('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  orders[idx] = { ...req.body, id };
  res.status(200).json(orders[idx]);
});
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});