import { Request, Response } from 'express';
import Order from "../models/Order";

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate('user').populate('orderItems.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('orderItems.product');
        if (!order) return res.status(404).json({message: 'Order not found'});
        res.status(200).json(order);
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Server Error'});
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        // Create logic
        const { user, orderItems, status, orderDate, deliveryDate } = req.body;

        if (user == undefined || orderItems == undefined || (orderItems && orderItems.length <= 0)) {
            return res.status(400).json({message: 'Invalid request'})
        }

        // Create a new order (duplicates are acceptable)
        let newOrder = new Order({
            user,
            orderItems,
            status,
            orderDate,
            deliveryDate
        });

        newOrder = await newOrder.save();

        res.status(201).json({order: newOrder});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'})
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { user, orderItems, status, orderDate, deliveryDate } = req.body;

        if (!orderId) {
            return res.status(400).json({message: 'Order ID was not supplied'});
        }

        if (!user && !orderItems && !status && !orderDate && !deliveryDate) {
            return res.status(400).json({mesage: 'No updated values were provides'});
        }
        // Check if order exists
        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({message: 'Order does not exist'});
        }

        // Update values if provided
        if (user) order.user = user;
        if (orderItems) order.orderItems = orderItems;
        if (status) order.status = status.toLowerCase();
        if (orderDate) order.orderDate = orderDate;
        if (deliveryDate) order.deliveryDate = deliveryDate;

        order = await order.save()

        res.status(200).json({message: 'Order was updated successfully', order})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'})
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({message: 'Order ID was not supplied'});
        }

        // Check if order exists
        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({message: 'Order does not exist'});
        }

        await order.deleteOne(); // Deletes the order

        res.status(200).json({message: 'Order was deleted successfully', order})

    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
}