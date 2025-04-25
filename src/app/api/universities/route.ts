import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const country = searchParams.get('country');
    const name = searchParams.get('name');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const whereClause: any = {};

    if (country) {
        whereClause.country = { equals: country, mode: 'insensitive'};
    }

    if (name){
        whereClause.name = { contains: name, mode: 'insensitive'};
    }

    const skip = (page - 1) * pageSize;

    const [universities, total] = await Promise.all([
        prisma.university.findMany({
            where: whereClause,
            take: pageSize,
            skip: skip,
            orderBy: {
                name: 'asc'
            }
        }),
        prisma.university.count({
            where: whereClause
        })
    ]);

    return NextResponse.json({
        universities,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
    });
}