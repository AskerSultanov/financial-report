// Source - https://stackoverflow.com/a/11767598
// Posted by Paul Sweatte, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-29, License - CC BY-SA 4.0

var getCookieByName = (name) => {
  var cookiestring = RegExp(name + "=[^;]+").exec(document.cookie);

  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "",
  );
};

export default getCookieByName;
