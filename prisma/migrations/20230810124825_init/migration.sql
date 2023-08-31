-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_updatedById_fkey";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
