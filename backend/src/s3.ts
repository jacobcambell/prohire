require('dotenv').config()
import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'

const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

const uploadFile = (file: File) => {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.name
    }

    return s3.putObject(uploadParams).promise()
}