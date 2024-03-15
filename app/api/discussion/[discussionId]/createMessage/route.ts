import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse incoming JSON data from the request body
    const { id, title, name, content, image } = await request.json();


    // Find the post by serial number
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      // If post not found, return a 404 response
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    

    // Return success response
    return NextResponse.json(
      { message: 'User created and added to post successfully' },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors that occur during processing
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
