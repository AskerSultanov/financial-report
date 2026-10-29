import showReport from "../../showReport.js";
import loadExcelLibs from "../../loadExcelLibs.js";
import reportFileParser from "../reportsFileParser/index.js";
import { generateReportXlsxBuffer } from "../reportToXlsxBuffer/index.js";
import writeReportToLocalStorage from "../../writeReportToLocalStorage.js";
import insertButtonToDownloadReportsInZip from "./insertButtonToDownloadReportsInZip.js";
import downloadReportAsXLSXButtonHandler from "../../downloadReportAsXLSXButtonHandler.js";

var maxFilesCount = 15;
var selectedFiles = [];
var paidStorageReportFileName = "Отчёт по платному хранению (номенклатуры)";
var weeklyFinancialReportFileName = "Еженедельный детализированный отчет №";
var allowedFileMimeTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

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

  for (var file of files) {
    if (fileIsValid(file) && count <= maxFilesCount) {
      validFiles.push(file);

      count++;
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
    var fileExtentionIsValid =
      file.name.endsWith(".zip") || file.name.endsWith(".xlsx");
    var fileNameIsValid =
      file.name.startsWith(weeklyFinancialReportFileName) ||
      file.name.startsWith(paidStorageReportFileName);

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
    if (!selectedFiles.length) {
      alert("Выберите хотя бы один файл");
      return;
    }

    var files = [];

    for (var file of selectedFiles) {
      var mimetype = file.type;
      var originalname = file.name;
      var buffer = await file2Buffer(file);

      files.push({ buffer, mimetype, originalname });
    }

    closeModal();

    var { reportsData } = await reportFileParser(files);

    if (reportsData.length > 1) {
      var { JSZip } = await loadExcelLibs();

      var zip = new JSZip();
      var folder = zip.folder("Отчёты");

      for (var report of reportsData) {
        var { buffer } = await generateReportXlsxBuffer(report);

        var fileNameForSeparateReport = `Расшифровка отчета с ${report.dateFrom} по ${report.dateTo} .xlsx`;

        folder.file(fileNameForSeparateReport, buffer);
      }

      // var { buffer } = await generateReportsSummaryXlsxBuffer(reportsData);

      var zipBuffer = await zip.generateAsync({
        type: "arrayBuffer",
        compression: "DEFLATE",
      });

      insertButtonToDownloadReportsInZip(zipBuffer);
    } else {
      var report = reportsData[0];

      showReport(report);
      writeReportToLocalStorage(report);
      downloadReportAsXLSXButtonHandler();
    }
  });

  return { uploadBtn };
};

async function file2Buffer(file) {
  return await new Promise(function (resolve) {
    var reader = new FileReader();
    var readFile = function () {
      var buffer = reader.result;
      resolve(buffer);
    };

    reader.addEventListener("load", readFile);
    reader.readAsArrayBuffer(file);
  });
}

var createModalFooterButtons = () => {
  var { cancelBtn } = createCancelBtn();
  var { uploadBtn } = createUploadBtn();

  var buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "modal-footer";

  buttonsWrapper.append(cancelBtn, uploadBtn);

  return { modalFooterButtons: buttonsWrapper };
};

var uploaderModalBodyDescription = `
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
              <strong>Примечания:<br> </strong><br> - За один раз можно загрузить не более ${maxFilesCount} файлов.<br> - Загрузка отчёта по платному хранению носит рекомендательный характер.
            </p>
          </div>`;

var createUploadedFileList = () => {
  var fileList = document.createElement("div");
  fileList.id = "file-list";
  fileList.className = "file-list";
  return { fileList };
};

var createUploadModalBody = () => {
  var uploadModalBody = document.createElement("div");
  uploadModalBody.className = "modal-body";

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
