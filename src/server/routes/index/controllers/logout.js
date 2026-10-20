var logoutController = (req, res, next) =>
  res.clearCookie("access_token").redirect("/");

export default logoutController;
