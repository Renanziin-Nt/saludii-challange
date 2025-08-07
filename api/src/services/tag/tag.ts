import { db } from 'src/lib/db'

export const tags = () => {
  return db.tag.findMany({
    include: { recipes: true },
    orderBy: { name: 'asc' },
  })
}

export const createTag = async ({ name }) => {
  return db.tag.create({
    data: { name },
  })
}