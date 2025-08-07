import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const categories = [
      { name: 'Café da Manhã' },
      { name: 'Almoço' },
      { name: 'Jantar' },
      { name: 'Sobremesa' },
      { name: 'Lanche' },
    ]

    const tags = [
      { name: 'Vegano' },
      { name: 'Sem Glúten' },
      { name: 'Rápido' },
      { name: 'Saudável' },
      { name: 'Conforto' },
    ]

    for (const category of categories) {
      await db.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      })
    }

    for (const tag of tags) {
      await db.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: tag,
      })
    }

    console.info('Seed data inserted: Categories and Tags.')
  } catch (error) {
    console.error('Error inserting seed data:', error)
  } finally {
    await db.$disconnect()
  }
}
