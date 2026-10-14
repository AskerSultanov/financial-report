var emptyStateToDisabledSkuTable = document.getElementById(
  "empty-state-disabled",
);

/**
 * @param {'enable' | 'disable'} action
 */

var toggleEmptyStateToDisabledSkus = (action) => {
  emptyStateToDisabledSkuTable.hidden = action === "disable";
};

export default toggleEmptyStateToDisabledSkus;
