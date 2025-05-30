"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 4000;
// In-memory "database"
let orders = [];
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Get all orders
app.get('/api/orders', (_req, res) => {
    res.json(orders);
});
// Create a new order
app.post('/api/orders', (req, res) => {
    const order = Object.assign(Object.assign({}, req.body), { id: Date.now().toString() });
    orders.push(order);
    res.status(201).json(order);
});
// Update an order
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) {
        res.status(404).json({ error: 'Order not found' });
        return;
    }
    orders[idx] = Object.assign(Object.assign({}, req.body), { id });
    res.status(200).json(orders[idx]);
});
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
