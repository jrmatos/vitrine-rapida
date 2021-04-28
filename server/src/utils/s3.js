const aws = require('aws-sdk');
const uniqueString = require('unique-string');
const sharp = require('sharp');

const {
    AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_S3_BUCKET, AW3_S3_BUCKET_URL
} = require('../configs');

aws.config.update({
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_KEY,
    region: 'us-east-1'
});

function putObject(Key, Body, configs) {
    return new Promise(async (resolve, reject) => {
        const s3 = new aws.S3();

        if (configs && configs.dimensions) {
            Body = await sharp(Body)
                            .resize(configs.dimensions.width, configs.dimensions.height)
                            .toBuffer();
        }

        var params = {
            Bucket: AWS_S3_BUCKET,
            Key,
            Body
        };

        s3.putObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);               
            }
        });
    });
}

function deleteObject(Key) {
    return new Promise((resolve, reject) => {
        const s3 = new aws.S3();

        var params = {
            Bucket: AWS_S3_BUCKET,
            Key
        };

        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);               
            }
        });
    });
}

function generateObjectUrl(key) {
    return `${AW3_S3_BUCKET_URL}/${key}`;
}

function getObjectKeyFromUrl(url) {
    const parts = url.split(`/`);
    return parts[parts.length - 1];
}

function generateUniqueObjectKeyFromFile(prefix, file) {
    const fileExtension = file.mimetype.split('/')[1];
    return `${prefix}-${uniqueString()}.${fileExtension}`;
}

module.exports = {
    putObject,
    deleteObject,
    generateObjectUrl,
    getObjectKeyFromUrl,
    generateUniqueObjectKeyFromFile
};
