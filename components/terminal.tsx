// components/terminal-component
import { io } from 'socket.io-client';
import { useEffect } from 'react';

var socket;

function TerminalComponent() {
  useEffect(() => {
    const terminalInitializer = async () => {
      const { Terminal } = await import('xterm');
      const term = new Terminal({ cursorBlink: true });
      let curr_line = '';
      let entries = [];
      const termPrefix = 'delightfulabyss.eth $ ';
      term.open(document.getElementById('terminal'));
      term.write(termPrefix);
      term.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) {
          if (curr_line) {
            entries.push(curr_line);
            term.write('\r\n' + termPrefix);
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
          socket.emit('prompt', curr_line);
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

      socket.on('return-data', (msg) => {
        console.log('Message received: ' + msg);
      });
    };
    terminalInitializer();
    socketInitializer();
  }, []);
  return <div id="terminal"></div>;
}

export default TerminalComponent;
