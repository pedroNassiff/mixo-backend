import { Request, Response } from 'express';
import { Service } from '../models/Services';
import Machine, { IMachine } from '../models/Machine';
import mongoose from 'mongoose';
export const generateServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find();

    if (machines.length === 0) {
      res.status(400).json({ message: 'No machines found to associate services.' });
      return;
    }

    const servicesList = [
      'Fernet con Cola',
    //   'Ron con Cola',
    //   'Gin Tonic',
    //   'Margarita',
    //   'Daiquiri',
    //   'Caipirinha',
    //   'Mojito',
    //   'Whisky Sour',
    //   'Piña Colada',
    //   'Bloody Mary',
    //   'Tequila Sunrise',
    //   'Cuba Libre',
    //   'Mai Tai',
    //   'Cosmopolitan',
    //   'Martini',
    //   'Manhattan',
    //   'Negroni',
    //   'Old Fashioned',
    //   'Spritz',
    //   'Sazerac',
    //   'Tom Collins',
    //   'Bellini',
    //   'Paloma',
    //   'Espresso Martini',
    //   'Mint Julep',
    //   'Sidecar',
    //   'Dark and Stormy',
    //   'Blue Lagoon',
    ];

    const randomServices = Array.from({ length: 28 }).map(() => {
      const machine = machines[Math.floor(Math.random() * machines.length)];
      return {
        type: 'Bebida',
        service: servicesList[Math.floor(Math.random() * servicesList.length)],
        price: parseFloat((Math.random() * 100 + 1).toFixed(2)),
        machineId: machine._id,
      };
    });

    const createdServices = await Service.insertMany(randomServices);
    res.status(201).json(createdServices);
  } catch (error) {
    res.status(500).json({ message: 'Error generating random services', error });
  }
};

export const getServices = async (req: Request, res: Response): Promise<void> => {
    try {
      const { machineId } = req.query;
  
      const query: any = {};
      if (machineId) {
        if (!mongoose.Types.ObjectId.isValid(machineId as string)) {
          res.status(400).json({ message: 'Invalid machineId' });
          return; // Termina la ejecución aquí
        }
        query.machineId = machineId;
      }
  
      const services = await Service.find(query).populate('machineId', 'name');
      res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Error fetching services', error });
    }
  };