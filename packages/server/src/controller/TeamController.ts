/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import connection from '../database/connection';

import { RequestAuth } from '../middleware/auth';

export default {
  index: async (
    request: RequestAuth,
    response: Response
  ): Promise<Response> => {
    try {
      const teams = await connection('team_user')
        .join('team', 'team.id', 'team_user.idTeam')
        .select('team.id', 'team.name');

      const teamsWithMembers = [];
      for await (const team of teams) {
        const members = await connection('team_user')
          .join('user', 'team_user.idUser', 'user.id')
          .select('user.name', 'team_user.type', 'user.email')
          .where({
            idTeam: team.id
          });

        teamsWithMembers.push({
          ...team,
          members
        });
      }

      return response.json(teamsWithMembers);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
  create: async (
    request: RequestAuth,
    response: Response
  ): Promise<Response> => {
    try {
      const { name } = request.body;

      const [idTeam] = await connection('team').insert(
        {
          name
        },
        'id'
      );

      await connection('team_user').insert({
        type: 1,
        idTeam,
        idUser: request.userAuthenticate?.id
      });

      return response.json({
        id: idTeam,
        name
      });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
};
