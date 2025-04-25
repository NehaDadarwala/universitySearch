import { prisma } from '../lib/prisma';
import universities from '../data/universities.json';

interface RawUniversity {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

async function main() {
  console.log('Starting to seed the database...');

  try {
    // Clear existing data
    await prisma.university.deleteMany();
    console.log('Cleared existing data');

    // Transform and insert data
    const transformedUniversities = universities.map((uni: RawUniversity) => ({
      name: uni.name,
      domains: uni.domains,
      webPages: uni.web_pages,
      country: uni.country,
      alphaTwoCode: uni.alpha_two_code,
      stateProvince: uni["state-province"],
      favorite: false
    }));

    const createdUniversities = await prisma.university.createMany({
      data: transformedUniversities,
    });

    console.log(`Created ${createdUniversities.count} universities`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 