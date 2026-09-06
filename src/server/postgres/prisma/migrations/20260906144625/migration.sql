/*
  Warnings:

  - Added the required column `queueCapacity` to the `ReportLoadingState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportLoadingState" ADD COLUMN     "queueCapacity" SMALLINT NOT NULL;
