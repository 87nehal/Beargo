import {prisma} from "."

export const createBadge = (badgeData) => {
    return prisma.badge.create({
        data: badgeData
    })
}

export const assignBadgeToUser = (userId, badgeId) => {
    return prisma.userBadge.create({
        data: {
            userId: userId,
            badgeId: badgeId
        }
    })
}

export const removeBadgeFromUser = (userId, badgeId) => {
    return prisma.userBadge.delete({
        where: {
            userId_badgeId: {
                userId: userId,
                badgeId: badgeId
            }
        }
    })
}