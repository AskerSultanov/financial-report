var logoutController = (req, res, next) => res.clearCookie("token").redirect("/");

export default logoutController;
