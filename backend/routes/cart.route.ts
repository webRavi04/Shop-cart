import { Router } from 'express';
import { addToCart, getCartById } from '../controllers/cartController';
const router = Router();

router.post('/addToCart', addToCart);
router.get('/cart/:id', getCartById);
router.get('/cart', getCartById);

export default router;