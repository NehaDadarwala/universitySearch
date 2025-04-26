import { PrismaClient } from '../src/generated/prisma'
import universitiesData from '../src/data/universities.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed...');

  // Clear existing data
  await prisma.university.deleteMany();
  console.log('Cleared existing data');

  // Load and transform the data
  const universities = universitiesData.map(uni => ({
    name: uni.name,
    domains: uni.domains,
    webPages: uni.web_pages,
    country: uni.country,
    alphaTwoCode: uni.alpha_two_code,
    stateProvince: uni['state-province'],
    favorite: false
  }));

  // Insert the data in batches to avoid memory issues
  const batchSize = 100;
  for (let i = 0; i < universities.length; i += batchSize) {
    const batch = universities.slice(i, i + batchSize);
    await prisma.university.createMany({
      data: batch,
      skipDuplicates: true
    });
    console.log(`Inserted batch ${i / batchSize + 1}`);
  }

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 