import type { NextApiRequest, NextApiResponse } from 'next';

const commands =
  'Here are a list of commands that are available: \r\n\r\n\thelp\t\tA list of available commands\r\n\tens\t\tMy ens\r\n\tabout\t\tAbout me\r\n\tinterests\tMy interests\r\n\tprojects\tCurrent and past project links\r\n\tcontact\t\tRelevant social links\r\n\tclear\t\tClear the terminal';
const responses = {
  help: `Welcome to my terminal! ${commands}`,
  ens: 'delightfulabyss.eth',
  about:
    "Hi there! My name is Matthew and I am a full-stack decentralized developer in the Ethereum blockchain ecosystem.\r\nMy career started in the nonprofit industry where I came in ready to help people and make change in the world and left completely frustrated at the lack of resourcing and misaligned incentives inherent in the industry. When I discovered blockchain and cryptocurrencies and learned the values backed into the technology, I knew I wanted to be a part of that reimagining of society. Now I work with individuals and organizations of all kinds to develop applications based on smart contracts, unstoppable pieces of code build on top of blockchains. I'm still a mission- driven person at heart, and I am specificially interested in the growing regenerative economics projects within the Crypto industry. Feel free to say hey if you think we could collaborate!",
  interests: 'music, photography, Dungeons and Dragons, horror movies, travel, meditation, self-improvement, nature',
  projects:
    'Current projects: https://www.ambire.com, https://www.cabin.city\r\nPrevious projects: https://www.climatefutures.io, https://www.chainsaw.fun',
  contact:
    'email: mattwatman@gmail.com, twitter: https://www.twitter.com/delightfulabyss, https://www.github.com/delightfulabyss, discord: delightfulabyss.eth#3679',
  clear: 'clear',
};
const commandHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { command } = req.query;
  switch (command) {
    case 'help':
      res.status(200).json({ result: responses.help });
      break;

    case 'ens':
      res.status(200).json({ result: responses.ens });
      break;

    case 'about':
      res.status(200).json({ result: responses.about });
      break;

    case 'interests':
      res.status(200).json({ result: responses.interests });
      break;

    case 'projects':
      res.status(200).json({ result: responses.projects });
      break;

    case 'contact':
      res.status(200).json({ result: responses.contact });
      break;

    case 'clear':
      res.status(200).json({ result: responses.clear });
      break;

    default:
      res.status(200).json({ result: `Command not found. ${commands}` });
      break;
  }
};
export default commandHandler;
