import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const skip = (page - 1) * pageSize;

    const [universities, total] = await Promise.all([
        prisma.university.findMany({
            where: {
                favorite: true
            },
            take: pageSize,
            skip: skip,
            orderBy: {
                name: 'asc'
            }
        }),
        prisma.university.count({
            where: {
                favorite: true
            }
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