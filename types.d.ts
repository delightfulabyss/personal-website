interface ServerToClientEvents {
  answer: (msg: string) => void;
}

interface ClientToServerEvents {
  question: (curr_line: string) => void;
}

interface SocketData {
  [string]: string;
}
