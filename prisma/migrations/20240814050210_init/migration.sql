-- CreateTable
CREATE TABLE "DeletedUsers" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_id" UUID,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeletedUsers_email_key" ON "DeletedUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeletedUsers_phoneNumber_key" ON "DeletedUsers"("phoneNumber");
