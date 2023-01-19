import { useEffect } from "react";

function TerminalComponent() {
  useEffect(() => {
    const initializeTerminal = async () => {
      const { Terminal } = await import("xterm");
      const { WebLinksAddon } = await import("xterm-addon-web-links");
      const { FitAddon } = await import("xterm-addon-fit");
      const fitAddon = new FitAddon();
      const term = new Terminal({ cursorBlink: true, theme: { foreground: "lime" } });
      term.loadAddon(new WebLinksAddon());
      term.loadAddon(fitAddon);
      let curr_line = "";
      const entries = [];
      const termPrefix = "$ ";
      const termDiv = document.getElementById("terminal");
      if (!termDiv) return;
      term.open(termDiv);
      fitAddon.fit();
      term.write(termPrefix + "help");
      term.onKey(({ key, domEvent }) => {
        if (domEvent.key === "Enter") {
          if (curr_line) {
            entries.push(curr_line);
            query(curr_line);
          }
        } else if (domEvent.key === "Backspace") {
          if (curr_line) {
            curr_line = curr_line.slice(0, curr_line.length - 1);
            term.write("\b \b");
          }
        } else {
          curr_line += key;
          term.write(key);
        }
      });
      const query = async (query: string) => {
        if (!query) return;
        const response = await fetch("/api/command?" + new URLSearchParams({ command: query }), {
          headers: {
            method: "GET",
          },
        });
        const { result } = await response.json();
        if (result === "clear") {
          term.reset();
          term.write(termPrefix);
        } else {
          term.write(`\r\n${result}`);
          term.write(`\r\n${termPrefix}`);
        }
        curr_line = "";
      };
      query("help");
      term.focus();
    };
    initializeTerminal();
  }, []);
  return <div id="terminal" className="fixed bottom-56 left-1/4 w-1/2 h-1/2" />;
}

export default TerminalComponent;
