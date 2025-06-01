import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createOrder } from './BusinessLogic/OrderService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

app.use(cors());
app.use(bodyParser.json());

// Get all orders
app.get('/api/orders', async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const order = createOrder(req);
    const newOrder = await prisma.order.create({
      data: {
        employees: order.employees
      }
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update an order
app.put('/api/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        employees: req.body.employees
      }
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(500).json({ error: 'Failed to update order' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});