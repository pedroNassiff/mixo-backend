import express from 'express';
import { getMachines, createMachine, updateMachine } from '../controllers/machineController';

const router = express.Router();

router.get('/', getMachines); // Obtener todas las máquinas
router.post('/', createMachine); // Crear una nueva máquina
router.put('/:id', updateMachine); // Actualizar una máquina existente

export default router;
