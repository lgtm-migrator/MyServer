import { Router } from 'express';

const ListenServer = Router();

ListenServer.get('/', (req, res) => {
    res.json({message: 'List Server'})
});

ListenServer.post('/', (req, res) => {
    res.json({message: 'Create Server'})
});

ListenServer.put('/:id/', (req, res) => {
    res.json({message: 'Edit Server'})
});

ListenServer.delete('/:id/', (req, res) => {
    res.json({message: 'Delete Server'})
});

export default ListenServer;