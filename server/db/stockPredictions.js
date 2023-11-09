import { prisma } from ".";

export const createStockPrediction = (stockPredictionData) => {
    return prisma.stockPrediction.create({
        data: stockPredictionData
    });
};