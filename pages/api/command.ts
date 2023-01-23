import type { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";

interface CommandQuery extends ParsedUrlQuery {
  command: string;
}
interface NextApiCommandRequest extends NextApiRequest {
  query: CommandQuery;
}

const commands =
  "Here is a list of commands that are available: \r\n\r\n\thelp\t\tA list of available commands\r\n\tens\t\tMy ens\r\n\tabout\t\tAbout me\r\n\tinterests\tMy interests\r\n\tprojects\tCurrent and past project links\r\n\tsocials\t\tRelevant social links\r\n\tclear\t\tClear the terminal";

const responses: { [key: string]: string } = {
  help: `Welcome to my terminal! ${commands}`,
  ens: "delightfulabyss.eth",
  about:
    "Hi there! My name is Matthew and I am a full-stack decentralized application developer in the Ethereum blockchain ecosystem. My career started in the nonprofit industry where I came in ready to help people and make change in the world and left completely frustrated at the lack of resourcing and misaligned incentives inherent in the industry. When I discovered blockchain and cryptocurrencies and learned the values baked into the technology, I knew I wanted to be a part of that reimagining of society. Now I work with individuals and organizations of all kinds to develop applications based on smart contracts, unstoppable pieces of code deployed on blockchains. I'm still a mission-driven person at heart, and I am specificially interested in the growing regenerative economics movement within the Crypto industry.\r\n\r\nFeel free to say hey if you think we could collaborate!",
  interests:
    "professional: regenerative economics, privacy, re-envisioning of work and housing\r\npersonal: music, photography, Dungeons and Dragons, horror movies, travel, meditation, self-improvement, nature",
  projects:
    "Current projects: https://www.ambire.com, https://www.cabin.city\r\nPrevious projects: https://www.climatefutures.io, https://www.chainsaw.fun",
  socials:
    "\x1b]8;;https://www.github.com/delightfulabyss\x07github\x1b]8;;\x07\r\n\x1b]8;;https://www.twitter.com/delightfulabyss\x07twitter\x1b]8;;\x07\r\n\x1b]8;;https://www.discordapp.com/users/612321813405499509\x07discord\x1b]8;;\x07\r\n\x1b]8;;https://www.linkedin.com/in/matthewwatman\x07linkedin\x1b]8;;\x07",
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
