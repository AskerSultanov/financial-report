import { MulterError } from "multer";
import { WBAPIError, FormDataError } from "../../customError/index.js";

var errorHandler = async (e, req, res, next) => {
  console.error({
    msg: e.message,
    errName: e.name,
    status: e?.status || 500,
    stack: e.stack,
    cause: e?.cause || null,
  });

  if (e instanceof MulterError) {
    return res.sendStatus(500);
  }

  if (e instanceof WBAPIError) {
    return res.status(e.status).json({ msg: e.message });
  }

  if (e instanceof FormDataError) {
    return res.status(e.status).json({ msg: e.message, invalidField: e.invalidField });
  }
  console.log(e.cause);
  res.status(e?.status || 500).json({ msg: "Произошла ошибка..." });
};

export default errorHandler;
