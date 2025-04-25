import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const university = await prisma.university.findUnique({
      where: { id }
    });

    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    const updatedUniversity = await prisma.university.update({
      where: { id },
      data: {
        favorite: !university.favorite
      }
    });

    return NextResponse.json(updatedUniversity);
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 