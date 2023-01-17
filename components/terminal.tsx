import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

function TerminalComponent() {
  useEffect(() => {
    const initializeTerminalAndSocket = async () => {
      const { Terminal } = await import('xterm');
      const { WebLinksAddon } = await import('xterm-addon-web-links');
      const term = new Terminal({ cursorBlink: true });
      term.loadAddon(new WebLinksAddon());
      let curr_line = '';
      const entries = [];
      const termPrefix = ' $ ';
      const termDiv = document.getElementById('terminal');
      if (!termDiv) return;
      term.open(termDiv);
      term.write(termPrefix);
      term.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) {
          if (curr_line) {
            entries.push(curr_line);
            query();
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
      const query = () => {
        if (curr_line) {
          socket.emit('query', curr_line);
        }
      };
      term.focus();
      await fetch('/api/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('Socket connected!');
      });

      socket.on('answer', (msg: string) => {
        if (msg === 'clear') {
          term.reset();
          term.write(termPrefix);
        } else {
          term.write(`\r\n ${msg}`);
          term.write(`\r\n${termPrefix}`);
        }
        curr_line = '';
      });
    };
    initializeTerminalAndSocket();
  }, []);
  return <div id="terminal" className="pt-52" />;
}

export default TerminalComponent;
