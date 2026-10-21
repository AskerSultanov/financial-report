import doRequest from "../utils/doRequest.js";
import createSkusTable from "./utils/createSkusTable.js";
import {
  toggleSkuTableVisibillity,
  toggleTableScrollVisibillity,
  toggleUploadListGoodsButtonVisibility,
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility,
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility,
} from "./utils/visibilityToggle/index.js";

var url = "/goods";
var uploadListGoodsButton = document.getElementById("upload-list-goods");

var loadListGoodsButtonHandler = (userId) => {
  uploadListGoodsButton.addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await doRequest(url, {
      method: "POST",
      body: JSON.stringify({ userId, requiredTokenType: "set" }),
      headers: { "content-type": "application/json" },
    });

    var data = await res.json();

    if (data?.errorText) {
      alert(data.errorText);
      return;
    }

    var { listGoods } = data;

    toggleUploadListGoodsButtonVisibility("disable");
    toggleSkuTableVisibillity("enabled-skus-table", "enable");
    toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");
    toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
    toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
    createSkusTable(listGoods, "enabled-skus-tbody");
  });
};

export default loadListGoodsButtonHandler;
