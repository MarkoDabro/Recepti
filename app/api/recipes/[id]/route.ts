// app/api/recipes/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params

    const recipe = await prisma.recipe.findUnique({
      where: { id },
    })

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(recipe)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const { title, description, ingredients, instructions, imageUrl } = body

    if (!title || !ingredients || !instructions) {
      return NextResponse.json(
        { error: 'Title, ingredients and instructions are required' },
        { status: 400 }
      )
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        ingredients,
        instructions,
        imageUrl: imageUrl || null,
      },
    })

    return NextResponse.json(recipe)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params

    await prisma.recipe.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Recipe deleted' })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    )
  }
}