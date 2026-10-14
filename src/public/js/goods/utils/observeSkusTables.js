import {
  toggleSkuTableVisibillity,
  toggleTableScrollVisibillity,
} from "./visibilityToggle/index.js";

var enabledSkusTbody = document.getElementById("enabled-skus-tbody");
var disabledSkusTbody = document.getElementById("disabled-skus-tbody");

var emptyStateToEnabledSkuTable = document.getElementById(
  "empty-state-enabled",
);

var emptyStateToDisabledSkuTable = document.getElementById(
  "empty-state-disabled",
);

var observeSkusTables = () => {
  var enabledSkusTableObserver = new MutationObserver((mutations) => {
    for (var m of mutations) {
      if (m.type === "childList") {
        if (enabledSkusTbody.childNodes.length === 0) {
          toggleSkuTableVisibillity("enabled-skus-table", "disable");
          toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
        } else {
          toggleSkuTableVisibillity("enabled-skus-table", "enable");
          toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");
        }
      }
    }
  });

  var disabledSkusTableObserver = new MutationObserver((mutations) => {
    for (var m of mutations) {
      if (m.type === "childList") {
        if (disabledSkusTbody.childNodes.length === 0) {
          toggleSkuTableVisibillity("disabled-skus-table", "disable");
          toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
        } else {
          toggleSkuTableVisibillity("disabled-skus-table", "enable");
          toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");
        }
      }
    }
  });

  enabledSkusTableObserver.observe(enabledSkusTbody, {
    subtree: false,
    childList: true,
  });

  disabledSkusTableObserver.observe(disabledSkusTbody, {
    subtree: false,
    childList: true,
  });
};

export default observeSkusTables;
