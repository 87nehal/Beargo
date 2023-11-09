import { prisma } from ".";
import bcrypt from "bcrypt"
export const createUser = (userData) =>{
    const finalUserData = {
        ...userData,
        password:bcrypt.hashSync(userData.password,10)
    }
    return prisma.user.create({
        data: finalUserData
    })
}

export const updateUser = (userId, userData) => {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });
};
  

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        },
        include: {
            following: true,
            followers: true,
            badges: {
                include: {
                    badge: true
                }
            }
        },
    })
}


export const getUserBySearch = (query, params = {}) => {
    return prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        }
      },
      include: {
        following: true,
        followers: true,
        badges: true
      }
    });
  };
  


export const getUserById = (userId) =>{
    return prisma.user.findUnique({
        where:{
            id: userId
        }
    })
}

export const likePost = async (userId, postId) => {
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: userId,
                postId: postId,
            },
        },
    });

    if (!existingLike) {
        // Remove existing dislike if it exists
        await prisma.dislike.deleteMany({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        return prisma.like.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });
    } else {
        // If like already exists, delete it
        return prisma.like.delete({
            where: {
                id: existingLike.id,
            },
        });
    }
};

export const dislikePost = async (userId, postId) => {
    const existingDislike = await prisma.dislike.findUnique({
        where: {
            userId_postId: {
                userId: userId,
                postId: postId,
            },
        },
    });

    if (!existingDislike) {
        // Remove existing like if it exists
        await prisma.like.deleteMany({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        return prisma.dislike.create({
            data: {
                userId: userId,
                postId: postId,
            },
        });
    } else {
        // If dislike already exists, delete it
        return prisma.dislike.delete({
            where: {
                id: existingDislike.id,
            },
        });
    }
};

export const isUserFollowing = async (followerId, followingId) => {
    const follow = await prisma.follow.findFirst({
        where: {
            followerId: followerId,
            followingId: followingId,
        },
    });
    return follow !== null;
};
