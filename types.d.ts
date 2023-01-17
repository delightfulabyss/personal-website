interface ServerToClientEvents {
  answer: (msg: string) => void;
}

interface ClientToServerEvents {
  query: (curr_line: string) => void;
}

interface SocketData {
  [string]: string;
}
