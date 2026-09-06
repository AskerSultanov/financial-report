import { DeleteObjectCommand } from "@aws-sdk/client-s3";

var deleteFile = async (client, Key) => {
  var command = new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key });
  var res = await client.send(command);
  return res;
};

export default deleteFile;
