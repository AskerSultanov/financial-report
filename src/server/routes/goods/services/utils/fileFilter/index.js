export default (req, file, cb) => {
  var validMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  return validMimeType === file.mimetype ? cb(null, (req.fileMimeTypeIsValid = true)) : cb(null, (req.fileMimeTypeIsValid = false));
};
