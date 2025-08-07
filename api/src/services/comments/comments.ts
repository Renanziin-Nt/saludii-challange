

import { db } from 'src/lib/db'

export const commentsByRecipe = ({ recipeId }) => {
  return db.comment.findMany({
    where: { recipeId },
    orderBy: { createdAt: 'desc' },
  })
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}
