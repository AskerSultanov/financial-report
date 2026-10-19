import getFile from "./utils/get.js";
import uploadFile from "./utils/upload.js";
import deleteFile from "./utils/delete.js";
import { S3Client } from "@aws-sdk/client-s3";
import checkBucketExist from "./utils/checkBucketExist.js";

var options = {
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
};
var client = new S3Client(options);

export default {
  getFile: (key) => getFile(client, key),
  uploadFile: (key, fileType) => uploadFile(client, key, fileType),
  deleteFile: (key) => deleteFile(client, key),
  checkBucketExist: () => checkBucketExist(client),
};
