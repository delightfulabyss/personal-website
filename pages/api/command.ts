import type { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";

interface CommandQuery extends ParsedUrlQuery {
  command: string;
}
interface NextApiCommandRequest extends NextApiRequest {
  query: CommandQuery;
}

const commands =
  "Here are a list of commands that are available: \r\n\r\n\thelp\t\tA list of available commands\r\n\tens\t\tMy ens\r\n\tabout\t\tAbout me\r\n\tinterests\tMy interests\r\n\tprojects\tCurrent and past project links\r\n\tcontact\t\tRelevant social links\r\n\tclear\t\tClear the terminal";

const responses: { [key: string]: string } = {
  help: `Welcome to my terminal! ${commands}`,
  ens: "delightfulabyss.eth",
  about:
    "Hi there! My name is Matthew and I am a full-stack decentralized application developer in the Ethereum blockchain ecosystem. My career started in the nonprofit industry where I came in ready to help people and make change in the world and left completely frustrated at the lack of resourcing and misaligned incentives inherent in the industry. When I discovered blockchain and cryptocurrencies and learned the values baked into the technology, I knew I wanted to be a part of that reimagining of society. Now I work with individuals and organizations of all kinds to develop applications based on smart contracts, unstoppable pieces of code deployed on blockchains. I'm still a mission-driven person at heart, and I am specificially interested in the growing regenerative economics movement within the Crypto industry.\r\nFeel free to say hey if you think we could collaborate!",
  interests: "music, photography, Dungeons and Dragons, horror movies, travel, meditation, self-improvement, nature",
  projects:
    "Current projects: https://www.ambire.com, https://www.cabin.city\r\nPrevious projects: https://www.climatefutures.io, https://www.chainsaw.fun",
  contact:
    "email: mattwatman@gmail.com,\r\ntwitter: https://www.twitter.com/delightfulabyss,\r\ngithub: https://www.github.com/delightfulabyss,\r\ndiscord: delightfulabyss.eth#3679",
  clear: "clear",
};

const commandHandler = (req: NextApiCommandRequest, res: NextApiResponse) => {
  const { command } = req.query;
  if (!Object.keys(responses).includes(command)) {
    res.status(404).json({ result: `Command not found. ${commands}` });
  } else {
    const result = responses[command];
    res.status(200).json({ result });
  }
};
export default commandHandler;
