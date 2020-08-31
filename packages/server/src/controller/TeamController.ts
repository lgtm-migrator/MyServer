import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
  create: async (request: Request, response: Response) => {
    try {
      const { name } = request.body;

      const [userId] = await connection('team').insert({
        name
      });

      return response.json({ id: userId, name });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
};
