import createUploadModal from "./createUploadModal.js";

var button = document.getElementById("upload-files-btn");

var createUploadModalButtonHandler = () => {
  button.addEventListener("click", () => createUploadModal());
};

export default createUploadModalButtonHandler;
