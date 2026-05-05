// app/api/recipes/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(recipes)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, ingredients, instructions, imageUrl } = body

    if (!title || !ingredients || !instructions) {
      return NextResponse.json(
        { error: 'Title, ingredients and instructions are required' },
        { status: 400 }
      )
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        instructions,
        imageUrl: imageUrl || null,
      },
    })

    return NextResponse.json(recipe, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    )
  }
}