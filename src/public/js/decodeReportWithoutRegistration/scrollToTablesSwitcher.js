var scrollToTablesSwitcher = () => {
  var tabs = document.querySelector(".tabs");

  if (!tabs) {
    return;
  }

  var siteHeader = document.querySelector(".site-header");
  var headerHeight = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
  var headerGap = 12;

  var top =
    tabs.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    headerGap;

  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
};

export default scrollToTablesSwitcher;
