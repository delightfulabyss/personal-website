import Head from 'next/head';
import Image from 'next/image';
import TerminalComponent from '../components/terminal';

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>delightfulabyss.eth</title>
        <meta name="description" content="" />
      </Head>
      <main className="container mx-auto">
        <TerminalComponent />
      </main>
      <footer className=""></footer>
    </div>
  );
}
