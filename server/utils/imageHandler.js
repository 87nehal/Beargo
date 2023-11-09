import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import {v2 as _cloudinary} from "cloudinary"
const config = useRuntimeConfig()
const cloudinary = () => {
    _cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })
    return _cloudinary
}
export const uploadToCloudinary = async (imagePath) => {
    const config = useRuntimeConfig()
    const data = new FormData();
    data.append('media', fs.createReadStream(imagePath));
    data.append('models', 'nudity-2.0,scam,gore');
    data.append('api_user', config.sightengineUserKey);
    data.append('api_secret', config.sightEngineSecret);

    try {
        const response = await axios({
            method: 'post',
            url:'https://api.sightengine.com/1.0/check.json',
            data: data,
            headers: data.getHeaders()
        });

        // Check the response for objectionable content
        if (response.data.status === 'success') {
            let reasons = [];
            if (response.data.nudity.sexual_activity > 0.7) reasons.push('sexual_activity');
            if (response.data.nudity.sexual_display > 0.5) reasons.push('sexual_display');
            if (response.data.nudity.erotica > 0.5) reasons.push('erotica');
            if (response.data.nudity.sextoy > 0.5) reasons.push('sextoy');
            if (response.data.nudity.suggestive > 0.5) reasons.push('suggestive');
            if (response.data.scam.prob > 0.7) reasons.push('scam');
            if (response.data.gore.prob > 0.8) reasons.push('gore');

            if (reasons.length > 0) {
                console.log('Image not uploaded due to: ' + reasons.join(', '));
                throw new Error('Image contains objectionable content: ' + reasons.join(', '));
            } else {
                // If the image is safe, upload it to Cloudinary
                return new Promise((resolve, reject) => {
                    cloudinary().uploader.upload(imagePath, (error, data) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(data)
                    })
                });
            }
        } else {
            throw new Error('Image check failed');
        }
    } catch (error) {
        // Handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
    }
}
