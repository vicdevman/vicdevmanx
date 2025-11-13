import { NextRequest, NextResponse } from "next/server";
import { getExperienceById } from "@/data/experiences";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const experience = getExperienceById(params.id);
    
    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
