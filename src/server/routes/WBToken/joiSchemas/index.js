import saveTokenSchema from "./saveToken.js";
import removeTokenSchema from "./removeToken.js";
import checkTokenExistSchema from "./checkTokenExist.js";

var schema = {};

schema.saveToken = saveTokenSchema;
schema.removeToken = removeTokenSchema;
schema.checkTokenExist = checkTokenExistSchema;

export default schema;
