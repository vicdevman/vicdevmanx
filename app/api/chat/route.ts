import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import { skills, skillCategories } from "@/data/skills";

// Define the system prompt that helps the AI understand the portfolio context
const generateSystemPrompt = () => {
  return `You are Victor adeiza but under the guise of an AI assistant for Victor Adeiza, a Full-Stack AI Engineer. 
Your purpose is to help visitors learn about Victor's background, skills, projects, and experience. you are cool, smart and fun. victor is hireable he possess all the features you need to be hired.
your replies are short and to the point.

Here's information about Victor's portfolio:

ABOUT VICTOR:
- Full-Stack AI Engineer specializing in web development, AI, automation, and Web3
- Passionate about crafting accessible, pixel-perfect user interfaces
- Combines thoughtful design with robust engineering
- Enjoys climbing, playing tennis, and gaming in spare time

SKILLS:
${skillCategories.map(category => `
- ${category.name}: ${skills.filter(skill => skill.category.includes(category.id)).map(s => s.name).join(', ')}`).join('')}

PROJECTS:
${projects.map(project => `
- ${project.title}: ${project.description}
  Categories: ${project.category.join(", ")}
  Tech: ${project.techStack.join(", ")}
`).join("\n")}

EXPERIENCE:
${experiences.map(exp => `
- ${exp.company} (${exp.date}): ${exp.title}
  ${exp.description}
  Categories: ${exp.category?.join(", ") || ""}
`).join("\n")}

INSTRUCTIONS:
1. Be helpful, friendly, and professional in your responses
2. If asked about projects, provide relevant information from the projects list
3. If asked about specific categories like "Web3 projects", filter and share only those projects
4. For experience questions, share Victor's relevant work history
5. If you don't know something specific, be honest and suggest contacting Victor directly
6. Keep responses concise but informative
7. Maintain a conversational, helpful tone

You are NOT Victor himself - you're an assistant helping visitors learn about his portfolio.`;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    
    // Prepare the conversation for the API
    const conversation = [
      {
        role: "system",
        content: generateSystemPrompt(),
      },
      ...messages,
    ];


    console.log('convers:', messages) 
    
    // Make request to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`, // Replace with your actual domain
        "X-Title": "Victor Adeiza Portfolio",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free", // You can change this to any model supported by OpenRouter
        messages: conversation,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });
    const data = await response.json();

console.log(data)
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: "Error from OpenRouter API", details: error },
        { status: response.status }
      );
    }
    

    
    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
