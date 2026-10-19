import checkBucketExist from "./checkBucketExist.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

var uploadFile = async (client, Key, fileType) => {
  await checkBucketExist(client);

  var command = new PutObjectCommand({
    Key,
    ContentType: fileType,
    Bucket: process.env.S3_BUCKET_NAME,
  });

  var presignedUrl = await getSignedUrl(client, command);

  return { presignedUrl };
};

export default uploadFile;
