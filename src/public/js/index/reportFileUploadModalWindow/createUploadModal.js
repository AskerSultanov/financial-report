import { insertNewReportToTree } from "../reportTreeBuilder/index.js";
import createNewReportsModalWindow from "./createNewReportsModalWindow.js";
import showReport from "../../decodeReportWithoutRegistration/showReport.js";
import { showSpinner, hideSpinner } from "../reportLoaderModalWindow/services/loaderSpinner.js";
import writeReportToLocalStorage from "../../decodeReportWithoutRegistration/writeReportToLocalStorage.js";

var maxFilesCount = 15;
var selectedFiles = [];
var url = "/report/files";
var userId = document.cookie.split("=")[1];
var paidStorageReportFileName = "Отчёт по платному хранению (номенклатуры)";
var weeklyFinancialReportFileName = "Еженедельный детализированный отчет №";
var allowedFileMimeTypes = ["application/zip", "application/x-zip-compressed", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

var isDecodeReportWithoutRegistrationPage = () => {
  var sources = [];
  var folderName = "decodeReportWithoutRegistration";

  for (var { src } of document.scripts) {
    sources.push(src);
  }

  return sources.every((src) => src.split("/")[4] === folderName);
};

var closeModal = () => {
  selectedFiles = [];

  var uploadModal = document.getElementById("upload-modal");

  uploadModal.style.display = "none";
  uploadModal.remove();

  document.body.style.overflow = "";
};

var dropZoneIcon = `
<svg class="drop-zone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
 <polyline points="17 8 12 3 7 8" />
 <line x1="12" y1="3" x2="12" y2="15" />
</svg>
`;

var dropZoneText = `
<p class="drop-zone-text">Перетащите файлы сюда или <span class="drop-zone-link">выберите файлы</span></p>
<p class="drop-zone-hint">Поддерживаются: ZIP, XLSX</p>
`;

var createDropZoneContent = () => {
  var dropZoneContent = document.createElement("div");

  dropZoneContent.className = "drop-zone-content";
  dropZoneContent.innerHTML = dropZoneIcon;
  dropZoneContent.innerHTML = dropZoneText;
  return { dropZoneContent };
};

var updateFileList = () => {
  if (!selectedFiles.length) {
    return;
  }

  var fileList = document.getElementById("file-list");
  fileList.innerHTML = "";
  fileList.style.display = "block";

  selectedFiles.forEach((file, index) => {
    var fileListItem = document.createElement("div");
    fileListItem.className = "file-item";

    var fileSize = (file.size / 1024).toFixed(1);

    var fileListItemContent = `
        <span class="file-name">${file.name}</span>
        <span class="file-size">${fileSize} KB</span>
        <button class="file-remove" data-index="${index}">×</button>
      `;

    fileListItem.innerHTML = fileListItemContent;
    fileList.append(fileListItem);
  });

  document.querySelectorAll(".file-remove").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var index = parseInt(this.dataset.index);
      selectedFiles.splice(index, 1);
      updateFileList();

      var dropZone = document.getElementById("drop-zone");
      var fileInput = document.getElementById("file-input");

      if (selectedFiles.length === 0) {
        dropZone.classList.remove("dragover", "has-files");
      }
      fileInput.value = "";
    });
  });
};

var createFileInput = () => {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "file-input";
  fileInput.multiple = true;
  fileInput.accept = ".zip,.xlsx";
  fileInput.className = "drop-zone-input";

  fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

  return { fileInput };
};

function handleFiles(files) {
  if (files.length === 0) {
    return;
  }

  var count = 0;
  var validFiles = [];

  if (isDecodeReportWithoutRegistrationPage()) {
    var paidStorageReportAdded = false;
    var weeklyFinancialReportAdded = false;

    for (var file of files) {
      if (fileIsValid(file) && file.name.startsWith(weeklyFinancialReportFileName)) {
        if (!weeklyFinancialReportAdded) {
          validFiles.push(file);
          weeklyFinancialReportAdded = true;
        }
      }
      if (fileIsValid(file) && file.name.startsWith(paidStorageReportFileName)) {
        if (!paidStorageReportAdded) {
          validFiles.push(file);
          paidStorageReportAdded = true;
        }
      }
    }
  } else {
    for (var file of files) {
      if (fileIsValid(file) && count <= maxFilesCount) {
        validFiles.push(file);

        count++;
      }
    }
  }

  if (validFiles.length === 0) {
    alert("Поддерживаются только файлы ZIP и XLSX");
    return;
  }

  selectedFiles = [...selectedFiles, ...validFiles];
  updateFileList();

  var dropZone = document.getElementById("drop-zone");
  var fileInput = document.getElementById("file-input");

  if (selectedFiles.length > 0) {
    dropZone.classList.add("has-files");
  }

  fileInput.value = "";

  function fileIsValid(file) {
    var fileMimeTypeIsValid = allowedFileMimeTypes.includes(file.type);
    var fileExtentionIsValid = file.name.endsWith(".zip") || file.name.endsWith(".xlsx");
    var fileNameIsValid = file.name.startsWith(weeklyFinancialReportFileName) || file.name.startsWith(paidStorageReportFileName);

    return fileMimeTypeIsValid && fileNameIsValid && fileExtentionIsValid;
  }
}

var createDropZone = () => {
  var dropZone = document.createElement("div");
  dropZone.id = "drop-zone";
  dropZone.className = "drop-zone";

  var { fileInput } = createFileInput();

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    var files = e.dataTransfer.files;
    handleFiles(files);
  });

  dropZone.addEventListener("click", (e) => {
    if (e.target.classList.contains("drop-zone-link")) {
      fileInput.click();
      return;
    }
    fileInput.click();
  });

  var { dropZoneContent } = createDropZoneContent();

  dropZone.append(dropZoneContent, fileInput);
  return { dropZone };
};

var createCancelBtn = () => {
  var cancelBtn = document.createElement("button");
  cancelBtn.id = "cancel-upload-btn";
  cancelBtn.textContent = "Отмена";
  cancelBtn.className = "modal-btn modal-btn-cancel";
  cancelBtn.addEventListener("click", () => closeModal());

  return { cancelBtn };
};

var createUploadBtn = () => {
  var uploadBtn = document.createElement("button");
  uploadBtn.textContent = "Загрузить";
  uploadBtn.id = "upload-files-action-btn";
  uploadBtn.className = "modal-btn modal-btn-upload";

  uploadBtn.addEventListener("click", async (e) => {
    var formData = new FormData();
    formData.append("userId", userId);

    if (!selectedFiles.length) {
      alert("Выберите хотя бы один файл");
      return;
    }

    selectedFiles.forEach((file) => formData.append("file", file));

    if (isDecodeReportWithoutRegistrationPage()) {
      url = "/decode-report-without-registration/files";
    }

    closeModal();
    showSpinner();

    var res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    hideSpinner();

    if (res.status === 200) {
      if (isDecodeReportWithoutRegistrationPage()) {
        var { report, reportPeriodIsEmpty } = await res.json();

        console.log({ reportPeriodIsEmpty });

        if (reportPeriodIsEmpty) {
          alert("Отчётный период пуст");
        } else {
          writeReportToLocalStorage(report);
          showReport(report);
        }
      } else {
        var { reportsData } = await res.json();

        if (reportsData.length) {
          createNewReportsModalWindow(reportsData);

          for (var report of reportsData) {
            insertNewReportToTree(report);
          }
        } else {
          alert("Отчёты не были добавлены");
        }
      }
    } else {
      return alert("Произошла ошибка при загрузке документов");
    }
  });

  return { uploadBtn };
};

var createModalFooterButtons = () => {
  var { cancelBtn } = createCancelBtn();
  var { uploadBtn } = createUploadBtn();

  var buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "modal-footer";

  buttonsWrapper.append(cancelBtn, uploadBtn);

  return { modalFooterButtons: buttonsWrapper };
};

var createUploadModalBodyDescription = () => {
  var uploaderModalBodyDescription;

  if (isDecodeReportWithoutRegistrationPage()) {
    uploaderModalBodyDescription = `
    <div class="upload-description">
            <p class="upload-description-text">
              Загрузите файлы отчётов Wildberries в формате <strong>ZIP</strong> или <strong>XLSX</strong>. 
            </p>
             <p class="upload-description-text">
              Поддерживаются следующие типы отчётов:
            </p>
            <ul class="upload-description-list">
              <li>Еженедельный детализированный отчет</li>
              <li>Отчёт по платному хранению (номенклатуры) за тот же отчётный период.</li>
              </ul>
            <p class="upload-description-note">
              <strong>Примечания:<br> </strong><br>За один раз можно загрузить <br> - Еженедельный детализированный отчет - 1 шт.<br> - Отчёт по платному хранению (номенклатуры) за тот же отчётный период  - 1 шт.<br><br>Загрузка отчёта по платному хранению носит рекомендательный характер.
            </p>
          </div>`;
  } else {
    uploaderModalBodyDescription = `
    <div class="upload-description">
            <p class="upload-description-text">
              Загрузите файлы отчётов Wildberries в формате <strong>ZIP</strong> или <strong>XLSX</strong>. 
            </p>
             <p class="upload-description-text">
              Поддерживаются следующие типы отчётов:
            </p>
            <ul class="upload-description-list">
              <li>Еженедельный детализированный отчет</li>
              <li>Отчёт по платному хранению (номенклатуры) за тот же отчётный период.</li>
              </ul>
            <p class="upload-description-note">
              <strong>Примечания:<br> </strong><br> - За один раз можно загрузить не более 15 файлов.<br> - Загрузка отчёта по платному хранению носит рекомендательный характер.
            </p>
          </div>`;
  }

  return { uploaderModalBodyDescription };
};

var createUploadedFileList = () => {
  var fileList = document.createElement("div");
  fileList.id = "file-list";
  fileList.className = "file-list";
  return { fileList };
};

var createUploadModalBody = (uploadModal) => {
  var uploadModalBody = document.createElement("div");
  uploadModalBody.className = "modal-body";

  var { uploaderModalBodyDescription } = createUploadModalBodyDescription();
  var { dropZone } = createDropZone();

  var { fileList } = createUploadedFileList();
  var { modalFooterButtons } = createModalFooterButtons();

  uploadModalBody.innerHTML = uploaderModalBodyDescription;
  uploadModalBody.append(dropZone, fileList, modalFooterButtons);

  return { uploadModalBody };
};

var createUploadModal = () => {
  var uploadModal = document.createElement("div");
  uploadModal.id = "upload-modal";
  uploadModal.style.display = "flex";
  uploadModal.className = "modal-overlay";

  document.body.style.overflow = "hidden";

  var { uploadModalBody } = createUploadModalBody(uploadModal);

  uploadModal.append(uploadModalBody);

  document.body.append(uploadModal);

  document.querySelector(".drop-zone-link").addEventListener("click", (e) => {
    e.stopPropagation();
    var fileInput = document.getElementById("file-input");
    fileInput.click();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && uploadModal.style.display === "flex") {
      closeModal();
    }
  });
};

export default createUploadModal;
