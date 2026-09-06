import checkReportsLoadingProgressService from "../services/checkReportsLoadingProgress.js";

var checkReportsLoadingProgressController = async (req, res, next) => {
  var { loadingInProgress } = await checkReportsLoadingProgressService(
    req.body,
  );

  if (loadingInProgress) {
    return res.json({
      infoText: "Отчет скоро будет добавлен.",
      errorText: "",
      reportData: {},
    });
  }

  next();
};

export default checkReportsLoadingProgressController;
