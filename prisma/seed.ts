// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      name: 'Test User',
      image: 'https://i.pravatar.cc/150?img=1',
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create a session for that user (expires in 7 days)
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  console.log(`✅ Created session for user: ${session.id}`);

  // Create some generations for that user
  await prisma.generation.createMany({
    data: [
      {
        userId: user.id,
        inputText: 'Write a LinkedIn post about why frontend developers should learn Next.js',
        outputText: '🚀 Next.js is a game changer for frontend developers! Here’s why...',
        status: 'completed',
        modelUsed: 'gemini-2.0-flash',
      },
      {
        userId: user.id,
        inputText: 'Turn this blog post into a tweet thread',
        outputText: '1/ Blogging is great, but did you know you can turn posts into threads?...',
        status: 'completed',
        modelUsed: 'gemini-2.0-flash',
      },
    ],
  });

  console.log('✅ Created sample generations');
}

main()
  .then(async () => {
    console.log('🌱 Seeding completed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
