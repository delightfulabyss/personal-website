import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing...');
    const io = new Server(req.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('prompt', (msg) => {
        socket.emit('return-data', msg);
      });
    });
  }
  res.end();
};
export default SocketHandler;
