import { DeleteObjectCommand } from "@aws-sdk/client-s3";

var deleteFile = async (client, Key) => {
  var command = new DeleteObjectCommand({
    Key,
    Bucket: process.env.S3_BUCKET_NAME,
  });

  var res = await client.send(command);
  return { httpStatusCode: res["$metadata"].httpStatusCode };
};

export default deleteFile;
