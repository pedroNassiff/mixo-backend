import { Request, Response } from 'express';
import Machine, { IMachine } from '../models/Machine';
import mongoose from 'mongoose';

// Obtener todas las máquinas
export const getMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error: any) {
    console.error("Error fetching machines", error);
    res.status(500).json({ message: "Error al obtener las máquinas", error: error.message });
  }
};

// Crear una nueva máquina
export const createMachine = async (req: Request, res: Response): Promise<void> => {
  const { name, status, services, image } = req.body;
  try {
    const newMachine: IMachine = new Machine({ name, status, services, image });
    await newMachine.save();
    res.status(201).json({message: "Maquina creada",newMachine});
  } catch (error: any) {
    console.error("Error creating machine", error);
    res.status(500).json({ message: "Error al crear la máquina", error: error.message });
  }
};

// Actualizar una máquina existente
export const updateMachine = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, status, services, image } = req.body;
  
    try {
      // Convertir el ID a ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
  
      const updatedMachine = await Machine.findByIdAndUpdate(
        id,
        { name, status, services, image },
        { new: true }
      );
  
      if (!updatedMachine) {
        res.status(404).json({ message: "Máquina no encontrada" });
        return;
      }
  
      res.status(200).json(updatedMachine);
    } catch (error: any) {
      console.error("Error updating machine", error);
      res.status(500).json({ message: "Error al actualizar la máquina", error: error.message });
    }
  };
