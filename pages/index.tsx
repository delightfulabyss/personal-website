import Head from 'next/head';
import TerminalComponent from '../components/Terminal';

export default function Home() {
  return (
    <>
      <Head>
        <title>delightfulabyss.eth</title>
        <meta name="description" content="" />
      </Head>
      <main>
        <TerminalComponent />
      </main>
      <footer className=""></footer>
    </>
  );
}
