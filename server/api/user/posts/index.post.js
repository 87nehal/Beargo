import formidable from "formidable";
import { createPost } from "~/server/db/posts.js";
import { createMediaFile } from "~/server/db/mediaFiles.js";
import {uploadToCloudinary} from "~/server/utils/imageHandler"
import {postTransformer} from "~/server/transformers/post.js"
export default defineEventHandler(async (event) => {
    const form = formidable({});
    const response = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });

    const { fields, files } = response;
    const userId = event.context?.auth?.user?.id;

    const postData = {
        text: fields.text ? fields.text.toString() : null,
        authorId: userId,
    };

    const replyTo = fields.replyTo

    if(replyTo && replyTo != 'null' && replyTo != 'undefined'){
        postData.replyToId = replyTo.toString()
    }

    const post = await createPost(postData);

    const filePromises = Object.keys(files).map(async key => {
        const file = files[key];
        const fileString = JSON.stringify(file);
        const fileArray = JSON.parse(fileString);
        const filepath = fileArray[0].filepath;
        const responsecloud =await uploadToCloudinary(filepath)

        return createMediaFile({
            url: responsecloud.secure_url,
            providerPublicId: responsecloud.public_id,
            userId: userId,
            postId: post.id
        });
    });

    await Promise.all(filePromises);

    return {
        post:postTransformer(post,userId)
    };
});
