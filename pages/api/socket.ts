import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer, Socket } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
const commands =
  'Here are a list of commands that are available: \r\n\r\n\thelp\t\tA list of available commands\r\n\tens\t\tMy ens\r\n\tabout\t\tAbout me\r\n\tinterests\tMy interests\r\n\tprojects\tCurrent and past project links\r\n\tcontact\t\tRelevant social links\r\n\tclear\t\tClear the terminal';
const responses = {
  help: `Welcome to my terminal! ${commands}`,
  ens: 'delightfulabyss.eth',
  about:
    "Hi there! My name is Matthew and I am a full-stack decentralized developer in the Ethereum blockchain ecosystem.\r\nMy career started in the nonprofit industry where I came in ready to help people and make change in the world and left completely frustrated at the lack of resourcing and misaligned incentives inherent in the industry. When I discovered blockchain and cryptocurrencies and learned the values backed into the technology, I knew I wanted to be a part of that reimagining of society. Now I work with individuals and organizations of all kinds to develop applications based on smart contracts, unstoppable pieces of code build on top of blockchains. I'm still a mission- driven person at heart, and I am specificially interested in the growing regenerative economics projects within the Crypto industry. Feel free to say hey if you think we could collaborate!",
  interests: 'music, photography, Dungeons and Dragons, horror movies, travel, meditation, self-improvement, nature',
  projects:
    'Current projects: https://www.ambire.com, https://www.cabin.city\r\n Previous projects: https://www.climatefutures.io, https://www.chainsaw.fun',
  contact:
    'email: mattwatman@gmail.com, twitter: https://www.twitter.com/delightfulabyss, https://www.github.com/delightfulabyss, discord: delightfulabyss.eth#3679',
  clear: 'clear',
};
const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket && res.socket.server && res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing...');
    const io = new IOServer<ClientToServerEvents, ServerToClientEvents, SocketData>(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      socket.on('query', (msg: string) => {
        switch (msg) {
          case 'help':
            socket.emit('answer', responses.help);
            break;

          case 'ens':
            socket.emit('answer', responses.ens);
            break;

          case 'about':
            socket.emit('answer', responses.about);
            break;

          case 'interests':
            socket.emit('answer', responses.interests);
            break;

          case 'projects':
            socket.emit('answer', responses.projects);
            break;

          case 'contact':
            socket.emit('answer', responses.contact);
            break;

          case 'clear':
            socket.emit('answer', responses.clear);
            break;

          default:
            socket.emit('answer', `Command not found. ${commands}`);
            break;
        }
      });
    });
  }
  res.end();
};
export default SocketHandler;
