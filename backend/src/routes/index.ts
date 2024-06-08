import { Router } from 'express';
import authController from '../controllers/auth.controller';
import emailController from '../controllers/email.controller';

const router = Router();

router.get('/auth/outlook', authController.outlookLogin);
router.get('/auth/outlook/callback', authController.outlookCallback);
router.post('/emails/sync', emailController.syncEmails);

export default router;
