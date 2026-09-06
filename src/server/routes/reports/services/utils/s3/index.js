import getFile from "./utils/get.js";
import uploadFile from "./utils/upload.js";
import deleteFile from "./utils/delete.js";
import { S3Client } from "@aws-sdk/client-s3";
import checkBucketExist from "./utils/checkBucketExist.js";

var client = new S3Client(JSON.parse(process.env.S3_CLIENT_OPTIONS));

export default {
  getFile: (key) => getFile(client, key),
  uploadFile: (key, body) => uploadFile(client, key, body),
  deleteFile: (key) => deleteFile(client, key),
  checkBucketExist: () => checkBucketExist(client),
};
