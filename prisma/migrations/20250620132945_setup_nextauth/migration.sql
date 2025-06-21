/*
  Warnings:

  - You are about to drop the column `session_token` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Session_session_token_key` ON `session`;

-- AlterTable
ALTER TABLE `account` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `session_token`,
    ADD COLUMN `sessionToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session`(`sessionToken`);
