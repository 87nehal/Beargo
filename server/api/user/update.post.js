import { prisma } from "~/server/db";
import { sendError } from "h3";
import bcrypt from "bcrypt"
import { updateUser,getUserById } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { userId, name, bio, newPassword, oldPassword } = body;

    if (!userId) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }));
    }

    const userData = {};

    if (name) {
        userData.name = name;
    }

    if (bio) {
        userData.bio = bio;
    }

    if (newPassword && oldPassword) {
        const user = await getUserById(userId);

        if (!bcrypt.compareSync(oldPassword, user.password)) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: 'Old password is incorrect'
            }));
        }

        userData.password = bcrypt.hashSync(newPassword, 10);
    }

    try {
        const updatedUser = await updateUser(userId, userData);
        return {
            body: updatedUser
        };
    } catch (error) {
        return error;
    }
});



