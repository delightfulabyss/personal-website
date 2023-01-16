import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

function TerminalComponent() {
  useEffect(() => {
    const terminalInitializer = async () => {
      const { Terminal } = await import('xterm');
      const term = new Terminal({ cursorBlink: true });
      let curr_line = '';
      const entries = [];
      const termPrefix = 'delightfulabyss.eth $ ';
      const termDiv = document.getElementById('terminal');
      if (!termDiv) return;
      term.open(termDiv);
      term.write(termPrefix);
      term.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) {
          if (curr_line) {
            entries.push(curr_line);
            term.write(`\r\n${termPrefix}`);
            prompt();
          }
        } else if (domEvent.keyCode === 8) {
          if (curr_line) {
            curr_line = curr_line.slice(0, curr_line.length - 1);
            term.write('\b \b');
          }
        } else {
          curr_line += key;
          term.write(key);
        }
      });
      const prompt = () => {
        if (curr_line) {
          socket.emit('question', curr_line);
        }
      };
      term.focus();
    };
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('Socket connected!');
      });

      socket.on('answer', (msg: string) => {
        console.log(`Message received: ${msg}`);
      });
    };
    terminalInitializer();
    socketInitializer();
  }, []);
  console.log('render');
  return <div id="terminal" />;
}

export default TerminalComponent;
