export interface Skill {
  id: string;
  name: string;
  icon?: string;
  description: string;
  proficiency: number; // 1-5 scale
  category: string[];
  yearsOfExperience?: number;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces",
    icon: "layout"
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Creating robust server-side applications and APIs",
    icon: "server"
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    description: "Implementing intelligent systems and data-driven solutions",
    icon: "brain"
  },
  {
    id: "web3",
    name: "Web3 & Blockchain",
    description: "Developing decentralized applications and smart contracts",
    icon: "link"
  },
  {
    id: "devops",
    name: "DevOps & Infrastructure",
    description: "Managing deployment, scaling, and operations",
    icon: "settings"
  },
  {
    id: "design",
    name: "Design & UI/UX",
    description: "Creating intuitive and beautiful user experiences",
    icon: "palette"
  }
];

export const skills: Skill[] = [
  // Frontend Skills
  {
    id: "react",
    name: "React",
    icon: "/icons/react.svg",
    description: "Building component-based user interfaces with React and its ecosystem",
    proficiency: 5,
    category: ["frontend"],
    yearsOfExperience: 4,
    featured: true
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "/icons/nextjs.svg",
    description: "Creating server-rendered React applications with Next.js",
    proficiency: 5,
    category: ["frontend"],
    yearsOfExperience: 3,
    featured: true
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    description: "Developing type-safe JavaScript applications",
    proficiency: 4,
    category: ["frontend", "backend"],
    yearsOfExperience: 3,
    featured: true
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
    description: "Styling applications with utility-first CSS framework",
    proficiency: 5,
    category: ["frontend", "design"],
    yearsOfExperience: 3,
    featured: true
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    icon: "/icons/framer.svg",
    description: "Creating fluid animations and interactions",
    proficiency: 4,
    category: ["frontend", "design"],
    yearsOfExperience: 2,
    featured: false
  },
  
  // Backend Skills
  {
    id: "nodejs",
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    description: "Building server-side applications with JavaScript",
    proficiency: 4,
    category: ["backend"],
    yearsOfExperience: 4,
    featured: true
  },
  {
    id: "express",
    name: "Express.js",
    icon: "/icons/express.svg",
    description: "Creating RESTful APIs and web servers",
    proficiency: 4,
    category: ["backend"],
    yearsOfExperience: 4,
    featured: false
  },
  {
    id: "prisma",
    name: "Prisma",
    icon: "/icons/prisma.svg",
    description: "Type-safe database access with Prisma ORM",
    proficiency: 4,
    category: ["backend"],
    yearsOfExperience: 2,
    featured: true
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "/icons/postgresql.svg",
    description: "Managing relational databases with PostgreSQL",
    proficiency: 3,
    category: ["backend"],
    yearsOfExperience: 3,
    featured: false
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/icons/mongodb.svg",
    description: "Working with NoSQL document databases",
    proficiency: 4,
    category: ["backend"],
    yearsOfExperience: 3,
    featured: true
  },
  
  // AI & ML Skills
  {
    id: "python",
    name: "Python",
    icon: "/icons/python.svg",
    description: "Developing AI and data science applications",
    proficiency: 4,
    category: ["ai", "backend"],
    yearsOfExperience: 3,
    featured: true
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    icon: "/icons/tensorflow.svg",
    description: "Building and training machine learning models",
    proficiency: 3,
    category: ["ai"],
    yearsOfExperience: 2,
    featured: false
  },
  {
    id: "pytorch",
    name: "PyTorch",
    icon: "/icons/pytorch.svg",
    description: "Implementing deep learning models",
    proficiency: 3,
    category: ["ai"],
    yearsOfExperience: 2,
    featured: false
  },
  {
    id: "langchain",
    name: "LangChain",
    icon: "/icons/langchain.svg",
    description: "Building LLM-powered applications",
    proficiency: 4,
    category: ["ai"],
    yearsOfExperience: 1,
    featured: true
  },
  
  // Web3 Skills
  {
    id: "solidity",
    name: "Solidity",
    icon: "/icons/solidity.svg",
    description: "Developing smart contracts for Ethereum",
    proficiency: 3,
    category: ["web3"],
    yearsOfExperience: 2,
    featured: true
  },
  {
    id: "ethersjs",
    name: "Ethers.js",
    icon: "/icons/ethers.svg",
    description: "Interacting with Ethereum blockchain",
    proficiency: 4,
    category: ["web3", "frontend"],
    yearsOfExperience: 2,
    featured: false
  },
  {
    id: "hardhat",
    name: "Hardhat",
    icon: "/icons/hardhat.svg",
    description: "Testing and deploying smart contracts",
    proficiency: 3,
    category: ["web3"],
    yearsOfExperience: 2,
    featured: false
  },
  
  // DevOps Skills
  {
    id: "docker",
    name: "Docker",
    icon: "/icons/docker.svg",
    description: "Containerizing applications for deployment",
    proficiency: 3,
    category: ["devops"],
    yearsOfExperience: 2,
    featured: false
  },
  {
    id: "aws",
    name: "AWS",
    icon: "/icons/aws.svg",
    description: "Deploying and managing cloud infrastructure",
    proficiency: 3,
    category: ["devops"],
    yearsOfExperience: 2,
    featured: false
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "/icons/vercel.svg",
    description: "Deploying frontend applications",
    proficiency: 5,
    category: ["devops"],
    yearsOfExperience: 3,
    featured: true
  }
];

export const getSkillsByCategory = (categoryId: string) => {
  return skills.filter(skill => skill.category.includes(categoryId));
};

export const getFeaturedSkills = () => {
  return skills.filter(skill => skill.featured);
};

export const getSkillById = (id: string) => {
  return skills.find(skill => skill.id === id);
};
