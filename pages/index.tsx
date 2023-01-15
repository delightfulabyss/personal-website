import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export default function Home() {
  const Terminal = dynamic(() => import('../components/terminal'), { ssr: false });
  return (
    <div className="container mx-auto">
      <Head>
        <title>delightfulabyss.eth</title>
        <meta name="description" content="" />
      </Head>
      <Terminal />
      <main className="container mx-auto">
        <div id="terminal" className="mt-12"></div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
