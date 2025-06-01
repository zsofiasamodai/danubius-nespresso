// Create new order

import { Order } from "../server"
import { Request } from 'express';

export function createOrder(req: Request) {
 const order: Order = { ...req.body, id: Date.now().toString() } as Order;
  // Assuming 'orders' is an in-memory array or a database collection 
return order;
}