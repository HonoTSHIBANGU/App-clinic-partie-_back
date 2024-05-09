-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "Articles" (
    "productId" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Commande" (
    "commandeId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("commandeId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "codeCategorie" SERIAL NOT NULL,
    "designationCategorie" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("codeCategorie")
);

-- CreateTable
CREATE TABLE "Panier" (
    "panierId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "Panier_pkey" PRIMARY KEY ("panierId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
