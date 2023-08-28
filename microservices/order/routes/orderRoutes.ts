import express from 'express';
import * as orderController from '../controllers/orderController';
import { authenticateJWT } from '@shamariishmael/shared';

const router = express.Router();

router.get('/', authenticateJWT, orderController.getAllOrders);
router.get('/:id', authenticateJWT, orderController.getOrderById);
router.post('/', authenticateJWT, orderController.createOrder);
router.put('/:id', authenticateJWT, orderController.updateOrder);
router.delete('/:id', authenticateJWT, orderController.deleteOrder);

export default router;