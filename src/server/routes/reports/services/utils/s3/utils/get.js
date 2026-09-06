import { GetObjectCommand } from "@aws-sdk/client-s3";

var getFile = async (client, Key) => {
  try {
    var command = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key });
    var { Body } = await client.send(command);
    var base64 = Body.transformToString("base64");
    return base64;
  } catch (e) {
    return null;
  }
};

export default getFile;
