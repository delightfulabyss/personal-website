import Head from "next/head";
import TerminalComponent from "../components/Terminal";
import VideoBackground from "../components/VideoBackground";

export default function Home() {
  return (
    <>
      <Head>
        <title>delightfulabyss.eth</title>
        <meta name="description" content="" />
      </Head>
      <VideoBackground />
      <TerminalComponent />
      <footer className=""></footer>
    </>
  );
}
