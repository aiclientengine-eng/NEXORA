import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const assets = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "BNB", name: "BNB" },
    { symbol: "XRP", name: "XRP" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "NXR", name: "NEXORA" },
  ];

  for (const asset of assets) {
    await prisma.asset.upsert({
      where: { symbol: asset.symbol },
      update: { name: asset.name, isActive: true },
      create: asset,
    });
  }

  await prisma.featureFlag.upsert({
    where: { key: "demo_mode" },
    update: {},
    create: { key: "demo_mode", enabled: true, description: "Use clearly labeled demo providers until live integrations are configured." },
  });

  console.log("NEXORA development seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
