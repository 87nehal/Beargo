import { mediaFileTransformer } from "./mediaFiles"
import { userTransformer } from "./user"
import human from "human-time"

export const postTransformer = (post, userId) => {
    const likesCount = post.reaction ? post.reaction.filter(r => r.type === 'LIKE').length : 0;
    const dislikesCount = post.reaction ? post.reaction.filter(r => r.type === 'DISLIKE').length : 0;
    const userReaction = post.reaction ? post.reaction.find(r => r.userId === userId) : null;
    return {
        id: post.id,
        text: post.text,
        mediaFiles: !!post.mediaFile ? post.mediaFile.map(mediaFileTransformer) : [],
        author: !!post.author ? userTransformer(post.author) : null,
        replies: !!post.replies ? post.replies.map(reply => postTransformer(reply, userId)) : [],
        replyTo: !!post.replyTo ? postTransformer(post.replyTo, userId) : null,
        repliesCount: !!post.replies ? post.replies.length : 0,
        likesCount: likesCount,
        dislikesCount: dislikesCount,
        userReaction: userReaction ? userReaction.type : null,
        postedAtHuman: human(post.createdAt)
    }
}