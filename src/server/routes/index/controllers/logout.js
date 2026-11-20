var logoutController = (req, res, next) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  return res.redirect("/");
};

export default logoutController;
