import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

import authenticateToken from "../middlewares/authMiddleware";

const router = Router();
const cartController = new CartController();

router.post('/add-to-cart', authenticateToken, cartController.addToCart.bind(cartController));
router.post('/remove-from-cart', authenticateToken, cartController.removeCartItem.bind(cartController));
router.post('/update-cart', authenticateToken, cartController.updateCartItem.bind(cartController));
router.post('/cart-details', authenticateToken, cartController.cartDetails.bind(cartController));
router.post('/cart-checkout', authenticateToken, cartController.checkoutCart.bind(cartController));
router.post('/update-order', authenticateToken, cartController.updateStatus.bind(cartController));
//router.post("/login", cartController.userLogin.bind(cartController));

export default router;
