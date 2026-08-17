import { HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

var command = new HeadBucketCommand({ Bucket: process.env.BUCKET_NAME });
var createBucketCommand = new CreateBucketCommand({ Bucket: process.env.BUCKET_NAME });

var checkBucketExist = async (client) => {
  try {
    await client.send(command);
  } catch (e) {
    if (e["$metadata"].httpStatusCode === 404) {
      var res = await client.send(createBucketCommand);
    }
  }
};

export default checkBucketExist;
