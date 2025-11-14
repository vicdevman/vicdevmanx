export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  link: string;
  githubLink?: string;
  demoLink?: string;
  category: string[];
  featured: boolean;
  completionDate: string;
  role?: string;
}

export const projects: Project[] = [
  {
    id: "ticky",
    title: "Ticky",
    image: "/project-image/ticky-game.png",
    description: "Multiplayer Tic-Tac-Toe game with real-time updates",
    longDescription: "Ticky is a multiplayer Tic-Tac-Toe game with real-time updates. It features a responsive and intuitive interface, smooth animations, and a leaderboard to track player performance. The game is built using React, Node.js, and TypeScript, with a focus on performance and accessibility. It includes features like player authentication, game history, and a leaderboard to track player performance.",
    techStack: [
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Vercel",
    ],
    link: "https://ticky-eta.vercel.app/",
    githubLink: "https://github.com/vicdevman/ticky",
    demoLink: "https://ticky-eta.vercel.app/",
    category: ["Web App", "Gaming", "Realtime", "Multiplayer"],
    featured: true,
    completionDate: "2024-06",
    role: "Full Stack Developer"
  },
  {
    id: "walletscan",
    title: "Wallet Scan",
    image: "/project-image/walletscan.png",
    description: "Real-time Proof of Funds PDF Generator",
    longDescription: "WalletScan is a comprehensive cryptocurrency portfolio management application that allows users to track their investments across multiple exchanges and wallets. It features real-time price updates, customizable alerts, detailed analytics, and historical performance tracking. The application integrates with major cryptocurrency exchanges via APIs and supports over 5000 cryptocurrencies.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Graphql",
       "Stripe(Test Mode)",
      "Appkit",
      "Wagmi",
      "Viem",
      "Web3/@Solana",
      "Helius API",
      "Zapper API",
      "CoinGecko API",
    ],
    link: "https://walletscan-staging.vercel.app",
    githubLink: "https://github.com/vicdevman/proof-of-funds-mvp",
    demoLink: "https://walletscan-staging.vercel.app",
    category: ["Web3", "DeFi", "Finance", "Blockchain"],
    featured: true,
    completionDate: "2023-11",
    role: "Lead Developer"
  },
  // {
  //   id: "aiwriter",
  //   title: "AI Writer",
  //   image: "/ai-writer.png",
  //   description: "AI-powered content generation tool for marketers and content creators",
  //   longDescription: "AI Writer is a sophisticated content generation platform that leverages advanced language models to help marketers and content creators produce high-quality articles, social media posts, and marketing copy. The tool features customizable tone settings, industry-specific templates, plagiarism checking, and SEO optimization suggestions. Users can generate content in multiple languages and export in various formats.",
  //   techStack: [
  //     "React",
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "OpenAI API",
  //     "MongoDB",
  //     "Express",
  //     "Node.js",
  //     "JWT Authentication",
  //   ],
  //   link: "https://ai-writer.app",
  //   githubLink: "https://github.com/vicdevman/ai-writer",
  //   demoLink: "https://demo.ai-writer.app",
  //   category: ["AI", "SaaS", "Content", "Productivity"],
  //   featured: true,
  //   completionDate: "2024-02",
  //   role: "Full Stack Developer"
  // },
  // {
  //   id: "nftmarketplace",
  //   title: "NFT Marketplace",
  //   image: "/nft-marketplace.png",
  //   description: "Decentralized marketplace for creating, buying, and selling NFTs",
  //   longDescription: "This NFT Marketplace is a fully decentralized platform that allows users to mint, buy, sell, and auction digital collectibles as NFTs. The platform supports multiple blockchains including Ethereum, Polygon, and Solana, and features a user-friendly interface for browsing collections, setting up auctions, and managing digital assets. Smart contracts ensure secure and transparent transactions with royalty distributions to original creators.",
  //   techStack: [
  //     "React",
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Ethers.js",
  //     "IPFS",
  //     "Solidity",
  //     "Hardhat",
  //     "The Graph",
  //     "MetaMask Integration",
  //   ],
  //   link: "https://nft-marketplace.app",
  //   githubLink: "https://github.com/vicdevman/nft-marketplace",
  //   demoLink: "https://demo.nft-marketplace.app",
  //   category: ["Web3", "NFT", "Blockchain", "Marketplace"],
  //   featured: false,
  //   completionDate: "2023-09",
  //   role: "Blockchain Developer"
  // },
  // {
  //   id: "aiimagegeneration",
  //   title: "AI Image Studio",
  //   image: "/ai-image-studio.png",
  //   description: "AI-powered image generation and editing platform with style transfer capabilities",
  //   longDescription: "AI Image Studio is a creative tool that leverages multiple AI models to generate and edit images based on text prompts. The platform offers features like style transfer, image-to-image transformation, inpainting, outpainting, and upscaling. Users can create artwork in various styles, modify existing images, and export high-resolution files for commercial use. The application includes a gallery feature for saving and organizing creations.",
  //   techStack: [
  //     "React",
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Stable Diffusion API",
  //     "DALL-E API",
  //     "AWS S3",
  //     "Redis",
  //     "Node.js",
  //     "Express",
  //   ],
  //   link: "https://ai-image-studio.app",
  //   githubLink: "https://github.com/vicdevman/ai-image-studio",
  //   demoLink: "https://demo.ai-image-studio.app",
  //   category: ["AI", "Creative", "SaaS"],
  //   featured: false,
  //   completionDate: "2024-01",
  //   role: "Frontend Developer"
  // },
  // {
  //   id: "defiprotocol",
  //   title: "DeFi Yield Aggregator",
  //   image: "/defi-yield.png",
  //   description: "Decentralized finance protocol that optimizes yield farming across multiple platforms",
  //   longDescription: "This DeFi Yield Aggregator is a smart contract protocol that automatically optimizes yield farming strategies across multiple DeFi platforms. It analyzes APY rates across lending protocols, liquidity pools, and staking opportunities to allocate funds for maximum returns while minimizing gas fees and impermanent loss. The protocol includes features like auto-compounding, risk assessment, and a governance token for protocol decisions.",
  //   techStack: [
  //     "Solidity",
  //     "React",
  //     "Next.js",
  //     "TypeScript",
  //     "Ethers.js",
  //     "Web3.js",
  //     "Hardhat",
  //     "OpenZeppelin",
  //     "The Graph",
  //     "Chainlink Oracles",
  //   ],
  //   link: "https://defi-yield.finance",
  //   githubLink: "https://github.com/vicdevman/defi-yield",
  //   demoLink: "https://app.defi-yield.finance",
  //   category: ["Web3", "DeFi", "Finance", "Blockchain"],
  //   featured: false,
  //   completionDate: "2023-08",
  //   role: "Smart Contract Developer"
  // }
];

export const getProjectsByCategory = (category: string) => {
  return projects.filter(project => project.category.includes(category));
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};

export const getWeb3Projects = () => {
  return projects.filter(project => 
    project.category.includes('Web3') || 
    project.category.includes('Blockchain') || 
    project.category.includes('DeFi') || 
    project.category.includes('NFT')
  );
};

export const getAIProjects = () => {
  return projects.filter(project => 
    project.category.includes('AI')
  );
};
