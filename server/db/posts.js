import {prisma} from "."


export const createPost = (postData)=>{
    return prisma.post.create({
        data: postData
    })
}

export const getPosts = (userId, params = {}, skip = 0, take = 10) => {
  return prisma.post.findMany({
    ...params,
    skip,
    take,
    where: {
        author: {
          followers: {
            some: {
              followerId: userId
            }
          }
        }
    },
    include: {
      ...params.include,
      reaction : {
        select: {
            userId: true,
            type: true
        }
      }
    },
  });
};

export const getSearchPosts = (query, params = {}) => {
  return prisma.post.findMany({
    where: {
      text: {
        contains: query,
        mode: "insensitive",
      },
    },
    ...params,
    include: {
      ...params.include,
      reaction : {
        select: {
            userId: true,
            type: true
        }
      }
    },
  });
};


export const getTrendingKeywords = async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const result = await prisma.$queryRaw`
    SELECT word, count(*) AS frequency
    FROM (
      SELECT tsvector_to_array(to_tsvector('english', text)) AS words
      FROM "Post"
      WHERE "createdAt" > ${oneDayAgo}
    ) subquery, unnest(words) AS word
    WHERE word @@ plainto_tsquery('english', word)
    GROUP BY word
    ORDER BY frequency DESC
    LIMIT 24;
  `;

  return result.map(({ word, frequency }) => ({ word, frequency: Number(frequency) }));
};

export const getPostsById = (postId,params={}) =>{
  return prisma.post.findUnique({
      where:{
          ...params.where,
          id: postId
      },
      ...params,
      include: {
        ...params.include,
        reaction : {
          select: {
              userId: true,
              type: true
          }
        }
      },
    });
  };

export const getPostsByUser = (username, params = {}) => {
    return prisma.post.findMany({
      where: {
        author: {
          username: username
        }
      },
      ...params,
      include: {
        ...params.include,
        reaction : {
          select: {
              userId: true,
              type: true
          }
        }
      },
    });
  };
  