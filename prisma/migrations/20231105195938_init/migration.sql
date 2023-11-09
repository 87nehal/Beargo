-- CreateTable
CREATE TABLE "StockPrediction" (
    "id" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "predictionPrice" DOUBLE PRECISION NOT NULL,
    "postId" UUID NOT NULL,

    CONSTRAINT "StockPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockPrediction_postId_key" ON "StockPrediction"("postId");

-- AddForeignKey
ALTER TABLE "StockPrediction" ADD CONSTRAINT "StockPrediction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
