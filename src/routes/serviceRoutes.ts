import express from 'express';
import { generateServices, getServices } from '../controllers/serviceController';

const router = express.Router();

router.post('/generate-random', generateServices);
router.get('/', getServices);

export default router;
