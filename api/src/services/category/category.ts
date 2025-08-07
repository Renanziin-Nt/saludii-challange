import { db } from 'src/lib/db'

export const createCategory = async ({ name }) => {
  return db.category.create({
    data: { name },
  })
}

export const categories = () => {
  return db.category.findMany({
    include: { recipes: true },
    orderBy: { name: 'asc' },
  })
}