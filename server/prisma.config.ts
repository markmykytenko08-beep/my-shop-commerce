import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig, prisma7Schema } from '@prisma/orm-postgres/config';

declare const process: {
  env: Record<string, string | undefined>;
};
export default definePrismaConfig({
  orm: ormConfig({
    contract: prisma7Schema("prisma/schema.prisma"),
    output: "src/prisma",
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
