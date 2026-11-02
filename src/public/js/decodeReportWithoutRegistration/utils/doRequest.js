var refreshPromise = null;

var doRequest = async (url, options = {}) => {
  var res = await fetch(url, { credentials: "include", ...options });

  if (res.status !== 401) return res;

  if (!refreshPromise) {
    refreshPromise = fetch("/auth/refresh/", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshPromise = null;
    });
  }

  var refreshRes = await refreshPromise;

  if (!refreshRes.ok) {
    window.location.replace("/decode-report-without-registration/");

    throw new Error("session expired");
  }

  return fetch(url, { credentials: "include", ...options });
};

export default doRequest;
