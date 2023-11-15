import { sendError } from "h3";
import UrlPattern from "url-pattern";
import { getUserById } from "../db/users";
import { decodeAccessToken } from "~/server/utils/jwt.js";

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/auth/logout',
    '/api/user/posts',
    '/api/user/update',
    '/api/user/search',
    '/api/posts',
    '/api/posts/search',
    '/api/posts/trends',
    '/api/posts/:id',
    '/api/posts/actions/react',
    '/api/posts/actions/delete',
    '/api/profile/:id',
    '/api/badges/assignbadge',
    '/api/badges/createBadge',
    '/api/badges/removebadges',
    '/api/perspective',
    '/api/user/leaderboard/top-badges',
    '/api/user/leaderboard/top-followers',
    '/api/user/leaderboard/top-likes',
  ]

  const isHandledByMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint)
    return pattern.match(event.node.req.url)
  });

  if (!isHandledByMiddleware) {
    return
  }

  const token = event.node.req.headers['authorization']?.split(' ')[1];
  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(event, createEvent({
      statusCode: "401",
      statusMessage: "Unauthorized"
    }));
  }

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);
    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
