/*
  Warnings:

  - A unique constraint covering the columns `[store_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "options" ADD COLUMN     "product_id" INTEGER,
ALTER COLUMN "option_name" DROP NOT NULL,
ALTER COLUMN "option_color" DROP NOT NULL,
ALTER COLUMN "option_size" DROP NOT NULL,
ALTER COLUMN "option_product_picture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_store_name_key" ON "users"("store_name");

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
