import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createOrder } from './BusinessLogic/OrderService';
import { supabase } from './database/supabase';

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
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const order = createOrder(req);
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update an order
app.put('/api/orders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('orders')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});