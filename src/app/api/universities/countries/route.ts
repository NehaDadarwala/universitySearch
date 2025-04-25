import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get all unique countries from the university table
    const countries = await prisma.university.findMany({
      distinct: ["country"],
      select: { country: true },
      orderBy: { country: "asc" },
    });

    // Extract country names into a simple array
    const uniqueCountries = countries.map((c) => c.country);

    return NextResponse.json(uniqueCountries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch unique countries." },
      { status: 500 }
    );
  }
}
