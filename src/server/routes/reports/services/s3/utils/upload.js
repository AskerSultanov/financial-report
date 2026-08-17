import checkBucketExist from "./checkBucketExist.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

var uploadFile = async (client, Key, Body) => {
  await checkBucketExist(client);

  var command = new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key, Body, ContentType: "image/png" });
  var res = await client.send(command);
  return { httpStatusCode: res["$metadata"].httpStatusCode };
};

export default uploadFile;
