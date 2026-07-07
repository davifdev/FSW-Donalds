/*
  Warnings:

  - The values [TAKEAWAY] on the enum `ConsumptionMehtod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsumptionMehtod_new" AS ENUM ('TAKE_AWAY', 'DINE_IN');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "ConsumptionMehtod_new" USING ("consumptionMethod"::text::"ConsumptionMehtod_new");
ALTER TYPE "ConsumptionMehtod" RENAME TO "ConsumptionMehtod_old";
ALTER TYPE "ConsumptionMehtod_new" RENAME TO "ConsumptionMehtod";
DROP TYPE "public"."ConsumptionMehtod_old";
COMMIT;
