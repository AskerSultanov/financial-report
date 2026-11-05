var enableActionBar = (year) => {
  var actionBarId = "action-bar-" + year;
  var actionBar = document.getElementById(actionBarId);
  if (actionBar) {
    actionBar.hidden = false;
  }
};

var disableActionBar = (year) => {
  var actionBarId = "action-bar-" + year;
  var actionBar = document.getElementById(actionBarId);
  if (actionBar) {
    actionBar.hidden = true;
  }
};

export { enableActionBar, disableActionBar };
