import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

var getFile = async (client, Key) => {
  var headObjCommand = new HeadObjectCommand({
    Key,
    Bucket: process.env.S3_BUCKET_NAME,
  });

  try {
    await client.send(headObjCommand);

    var getObjCommand = new GetObjectCommand({
      Key,
      Bucket: process.env.S3_BUCKET_NAME,
    });

    var signedUrl = await getSignedUrl(client, getObjCommand, {
      expiresIn: 300,
    });

    return { signedUrl };
  } catch (e) {
    return { signedUrl: null };
  }
};

export default getFile;
