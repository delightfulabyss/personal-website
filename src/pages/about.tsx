import React from 'react';

import Link from 'next/link';

import { Content } from '../content/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main
    meta={
      <Meta
        title="About Me"
        description="Description of who I am and what I do"
      />
    }
  >
    <Content>
      <p>
        Hi there! My name is Matthew or you can call me delightfulabyss. I&apos;
        a full-stack web3 developer who specializes in writing decentralized
        applications using the Ethereum blockchain.
      </p>
      <p>
        Most of the time you can find me helping to build a decentralized city
        with <Link href="https://www.creatorcabins.com">Cabin DAO</Link> and
        learning and earning with the{' '}
        <Link href="https://www.solidityguild.com">Solidity Guild</Link>. When
        I&apos;m not doing that, I enjoy exploratory travel, photography,
        Dungeons and Dragons and making music.
      </p>
    </Content>
  </Main>
);

export default About;
