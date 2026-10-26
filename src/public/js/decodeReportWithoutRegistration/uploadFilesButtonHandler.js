import createUploadModal from "./utils/reportFileUploadModalWindow/createUploadModal.js";

var uploadFilesBtn = document.getElementById("upload-files-btn");

var uploadFilesButtonHandler = () => {
  try {
    uploadFilesBtn.addEventListener("click", () => {
      document.getElementById("dialog").close();

      createUploadModal();
    });
  } catch (e) {
    console.log(e);
  }
};

export default uploadFilesButtonHandler;
