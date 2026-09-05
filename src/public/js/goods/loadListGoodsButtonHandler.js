import createSkusTable from "./utils/createSkusTable.js";
import toggleSkuTableVisibillity from "./utils/visibilityToggle/toggleSkuTableVisibillity.js";
import toggleUploadListGoodsButtonVisibility from "./utils/visibilityToggle/toggleUploadListGoodsButtonVisibility.js";
import toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility from "./utils/visibilityToggle/toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility.js";
import toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility from "./utils/visibilityToggle/toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility.js";

var url = "/goods";
var userId = document.cookie.split("=")[1];
var uploadListGoodsButton = document.getElementById("upload-list-goods");

var loadListGoodsButtonHandler = () => {
  uploadListGoodsButton.addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ userId }),
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
    toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
    toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
    await createSkusTable(listGoods, "enabled-skus-tbody");
  });
};

export default loadListGoodsButtonHandler;
