import { getTrendingKeywords } from '~/server/db/posts';

export default defineEventHandler(async (event) => {
  const trendingKeywords = await getTrendingKeywords();

  return {
    trendingKeywords,
  };
});
