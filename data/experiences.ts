export interface Experience {
  id: string;
  date: string;
  company: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  link: string;
  location?: string;
  achievements?: string[];
  category?: string[];
}

export const experiences: Experience[] = [
  {
    id: "guru-innovation-hub",
    date: "2024 - PRESENT",
    company: "Guru Innovation Hub",
    title: "Frontend Engineer (Intern)",
    description:
      "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    longDescription: 
      "As a Frontend Engineer Intern at Guru Innovation Hub, I contribute to the development and maintenance of critical UI components that power Klaviyo's frontend infrastructure. My responsibilities include implementing new features, optimizing performance, and ensuring cross-browser compatibility. I collaborate with designers to translate mockups into responsive, accessible interfaces, and work with backend engineers to integrate frontend components with APIs. I also participate in code reviews, testing, and documentation to maintain high code quality standards.",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Vercel",
    ],
    link: "https://guru-innovation.com",
    location: "Remote",
    achievements: [
      "Reduced component load time by 40% through code optimization and lazy loading",
      "Implemented accessibility improvements that increased WCAG compliance score from 78% to 95%",
      "Developed reusable component library that decreased development time for new features by 30%",
      "Contributed to open-source projects maintained by the company"
    ],
    category: ["Frontend", "Web Development", "UI/UX"]
  },
  {
    id: "tech-innovators",
    date: "2023 - 2024",
    company: "Tech Innovators",
    title: "Full Stack Developer",
    description:
      "Designed and developed full-stack web applications using React, Node.js, and MongoDB. Implemented RESTful APIs, authentication systems, and real-time features using WebSockets.",
    longDescription:
      "At Tech Innovators, I worked on multiple client projects as a Full Stack Developer, handling both frontend and backend development. I was responsible for architecting scalable web applications, implementing secure authentication systems, and optimizing database queries. I collaborated with UI/UX designers to create intuitive user interfaces and worked with DevOps engineers to set up CI/CD pipelines. I also mentored junior developers and contributed to technical documentation and code standards.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
      "Docker",
      "AWS",
      "Jest",
      "GitHub Actions"
    ],
    link: "https://tech-innovators.com",
    location: "San Francisco, CA (Hybrid)",
    achievements: [
      "Led development of a customer portal that increased client engagement by 45%",
      "Implemented microservices architecture that improved system scalability and reduced deployment time by 60%",
      "Optimized database queries resulting in 70% faster load times for data-heavy pages",
      "Received 'Developer of the Quarter' award for exceptional contributions"
    ],
    category: ["Full Stack", "Web Development", "Backend"]
  },
  {
    id: "blockchain-ventures",
    date: "2022 - 2023",
    company: "Blockchain Ventures",
    title: "Blockchain Developer",
    description:
      "Developed smart contracts and decentralized applications (dApps) on Ethereum and Solana. Implemented token standards, NFT marketplaces, and DeFi protocols.",
    longDescription:
      "As a Blockchain Developer at Blockchain Ventures, I specialized in creating secure smart contracts and building decentralized applications. I worked on implementing various token standards (ERC-20, ERC-721, ERC-1155), developing NFT marketplaces with royalty systems, and creating DeFi protocols including lending platforms and yield aggregators. I conducted security audits of smart contracts, optimized gas usage, and integrated wallets and Web3 authentication into frontend applications. I also researched emerging blockchain technologies and participated in hackathons to explore innovative use cases.",
    techStack: [
      "Solidity",
      "Rust",
      "Web3.js",
      "Ethers.js",
      "Hardhat",
      "Truffle",
      "React",
      "The Graph",
      "IPFS",
      "MetaMask"
    ],
    link: "https://blockchain-ventures.io",
    location: "Remote",
    achievements: [
      "Developed a gas-optimized NFT marketplace that reduced transaction costs by 35%",
      "Created a secure multi-signature wallet contract used by over 500 organizations",
      "Built a DeFi yield farming protocol that attracted $2M in total value locked within first month",
      "Published technical articles on blockchain development best practices"
    ],
    category: ["Blockchain", "Web3", "Smart Contracts", "DeFi"]
  },
  {
    id: "ai-solutions",
    date: "2021 - 2022",
    company: "AI Solutions",
    title: "Machine Learning Engineer",
    description:
      "Designed and implemented machine learning models for natural language processing and computer vision applications. Deployed models to production using MLOps practices.",
    longDescription:
      "At AI Solutions, I worked as a Machine Learning Engineer focusing on developing and deploying AI models for enterprise clients. I designed and trained models for sentiment analysis, document classification, image recognition, and recommendation systems. I was responsible for data preprocessing, feature engineering, model selection, and hyperparameter tuning. I implemented MLOps practices including CI/CD for ML models, monitoring, and automated retraining pipelines. I also collaborated with product managers to define AI features and with frontend developers to integrate AI capabilities into user-facing applications.",
    techStack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Hugging Face",
      "Docker",
      "Kubernetes",
      "AWS SageMaker",
      "MLflow",
      "FastAPI"
    ],
    link: "https://ai-solutions.tech",
    location: "Boston, MA (On-site)",
    achievements: [
      "Improved NLP model accuracy by 17% using transformer architecture and custom pre-training",
      "Reduced model inference time by 65% through optimization techniques and quantization",
      "Implemented automated ML pipeline that decreased model deployment time from days to hours",
      "Created an internal tool for non-technical teams to train custom models without coding"
    ],
    category: ["AI", "Machine Learning", "NLP", "Computer Vision"]
  }
];

export const getExperienceById = (id: string) => {
  return experiences.find(experience => experience.id === id);
};

export const getExperiencesByCategory = (category: string) => {
  return experiences.filter(experience => experience.category?.includes(category));
};

export const getBlockchainExperiences = () => {
  return experiences.filter(experience => 
    experience.category?.includes('Blockchain') || 
    experience.category?.includes('Web3') || 
    experience.category?.includes('DeFi')
  );
};

export const getAIExperiences = () => {
  return experiences.filter(experience => 
    experience.category?.includes('AI') || 
    experience.category?.includes('Machine Learning')
  );
};
