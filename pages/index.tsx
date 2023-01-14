import Head from 'next/head';
import Image from 'next/image';
import { Terminal } from 'xterm';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import('xterm');
      const term = new Terminal();
      term.open(document.getElementById('terminal'));
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    };
    initTerminal();
  }, []);
  return (
    <div className="container mx-auto">
      <Head>
        <title>delightfulabyss.eth</title>
        <meta name="description" content="" />
      </Head>

      <main className="container mx-auto">
        <div id="terminal"></div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
