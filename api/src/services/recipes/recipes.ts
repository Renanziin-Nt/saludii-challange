import axios from 'axios'
import { db } from 'src/lib/db'

export const createRecipe = async ({ input }) => {
  const recipe = await db.recipe.create({
    data: {
      title: input.title,
      ingredients: input.ingredients,
      instructions: input.instructions,
      prepTime: input.prepTime,
      servings: input.servings,
      personalNote: input.personalNote,
      slug: input.slug,
      categoryId: input.categoryId,
      userName: input.userName,
      tags: input.tagIds?.length
        ? { create: input.tagIds.map((tagId) => ({ tagId })) }
        : undefined,
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
      likes: true,
    },
  })

  await axios.post('http://localhost:3001/emit', {
    event: 'recipeCreated',
    data: recipe,
  })

  return recipe
}

export const recipes = async ({ categoryId, tagId }) => {
  const where = {}

  if (categoryId) where.categoryId = categoryId
  if (tagId) where.tags = { some: { tagId } }

  return db.recipe.findMany({
    where,
    include: {
      likes: true,
      category: true,
      tags: { include: { tag: true } },
    },
  })
}

export const recipe = ({ id }: { id: number }) => {
  return db.recipe.findUnique({
    where: { id },
    include: {
      likes: true,
      category: true,
      tags: { include: { tag: true } },
      comments: true,
    },
  })
}



export const createComment = ({ input }) => {
  return db.comment.create({
    data: {
      content: input.content,
      recipeId: input.recipeId,
      userName: input.userName || null,
    },
  })
}

export const likeRecipe = async ({ recipeId, userId }) => {

  const existingLike = await db.like.findFirst({
    where: {
      recipeId,
      userId,
    },
  })

  if (existingLike) {

    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    })

    return { isLiked: false }
  }


  const like = await db.like.create({
    data: {
      recipeId,
      userId,
    },
    include: { recipe: true },
  })

  return { isLiked: true }
}


