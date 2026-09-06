var fileFilter = (req, file, cb) => {
  var validMimeTypes;

  if (req.originalUrl === "/report/image/") {
    validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
  } else if (req.originalUrl === "/report/files" || "/decode-report-without-registration/files") {
    validMimeTypes = ["application/zip", "application/x-zip-compressed", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  }

  return validMimeTypes?.includes(file.mimetype) ? cb(null, (req.fileMimeTypeIsValid = true)) : cb(null, (req.fileMimeTypeIsValid = false));
};

export default fileFilter;
