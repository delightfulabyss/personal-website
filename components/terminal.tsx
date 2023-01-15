// components/terminal-component
import { Terminal } from 'xterm';

function TerminalComponent() {
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
        term.prompt();
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
  term.prompt = () => {
    if (curr_line) {
      console.log(curr_line);
    }
  };
  term.prompt();
  term.focus();
  return <div id="terminal"></div>;
}

export default TerminalComponent;
