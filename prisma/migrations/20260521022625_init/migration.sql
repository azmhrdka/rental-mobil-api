-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PELANGGAN');

-- CreateEnum
CREATE TYPE "Transmisi" AS ENUM ('MANUAL', 'OTOMATIS');

-- CreateEnum
CREATE TYPE "StatusMobil" AS ENUM ('TERSEDIA', 'DISEWA', 'PERAWATAN');

-- CreateEnum
CREATE TYPE "StatusPemesanan" AS ENUM ('PENDING', 'DIKONFIRMASI', 'AKTIF', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "MetodePembayaran" AS ENUM ('TRANSFER_BANK', 'TUNAI', 'QRIS');

-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('BELUM_BAYAR', 'LUNAS', 'REFUND');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "no_hp" TEXT,
    "alamat" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PELANGGAN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobil" (
    "id" SERIAL NOT NULL,
    "nama_mobil" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "transmisi" "Transmisi" NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "harga_per_hari" DECIMAL(10,2) NOT NULL,
    "status" "StatusMobil" NOT NULL DEFAULT 'TERSEDIA',
    "foto" TEXT,
    "deskripsi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mobil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pemesanan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mobil_id" INTEGER NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "total_hari" INTEGER NOT NULL,
    "total_harga" DECIMAL(12,2) NOT NULL,
    "status" "StatusPemesanan" NOT NULL DEFAULT 'PENDING',
    "catatan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "jumlah" DECIMAL(12,2) NOT NULL,
    "metode" "MetodePembayaran" NOT NULL,
    "status" "StatusPembayaran" NOT NULL DEFAULT 'BELUM_BAYAR',
    "bukti_transfer" TEXT,
    "tanggal_bayar" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_pemesanan_id_key" ON "pembayaran"("pemesanan_id");

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_mobil_id_fkey" FOREIGN KEY ("mobil_id") REFERENCES "mobil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
