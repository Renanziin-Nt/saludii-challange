import { db } from 'src/lib/db'

export const likes = () => {
  return db.like.findMany({
    include: { recipe: true },
    orderBy: { createdAt: 'desc' },
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
    throw new Error('You have already liked this recipe.')
  }

  const like = await db.like.create({
    data: { recipeId, userId },
    include: { recipe: true },
  })

  return like
}
