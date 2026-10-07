import { FaGamepad, FaRobot, FaCode, FaCogs } from "react-icons/fa";

const services = [
  {
    title: "Interactive Systems",
    icon: FaGamepad,
    description: "Gameplay, VR and desktop interactions, animation, and audio systems built with Unreal Engine and Unity.",
    tools: "C++ · C# · Unreal · Unity",
    href: "/projects/shape-shooter",
  },
  {
    title: "AI Integrations",
    icon: FaRobot,
    description: "Applications connecting language models, speech recognition, and speech synthesis through local and cloud APIs.",
    tools: "Python · LLMs · Speech APIs",
    href: "/projects/stenovate",
  },
  {
    title: "Web Applications",
    icon: FaCode,
    description: "Interactive interfaces, backend APIs, authentication, and database-backed features for useful web applications.",
    tools: "React · TypeScript · Next.js",
    href: "https://devtechlife.com",
  },
  {
    title: "Tools & Automation",
    icon: FaCogs,
    description: "Practical tools that connect services, simplify repetitive work, and make technical workflows easier to use.",
    tools: "Python · APIs · Workflow tooling",
    href: "https://github.com/phiggs-dev/stenovate",
  },
];

export default services;
