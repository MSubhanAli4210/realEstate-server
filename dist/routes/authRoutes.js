import express from 'express';
import { loginController } from '../controllers/loginController.js';
import { signupController } from '../controllers/signupController.js';
import { loginCredentialsCheck, signupCredentialsCheck } from '../middleware/credentialsCheck.js';
const router = express.Router();
router.post('/login', loginCredentialsCheck, loginController);
router.post('/register', signupCredentialsCheck, signupController);
export default router;
