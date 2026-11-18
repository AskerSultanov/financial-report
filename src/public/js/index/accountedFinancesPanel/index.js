import showLastAccountedFinancesPanel from "./showLastAccountedFinancesPanel.js";
import sortReportsByAccountingDate from "../utils/sortReportsByAccountingDate.js";
import insertLastAccountedFinancesReportDataToPanel from "./insertLastAccountedFinancesReportDataToPanel.js";
import otherAccountedFinancesReportsModalWindowHandler from "./otherAccountedFinancesReportsModalWindowHandler.js";

var accountedFinancesPanelHandler = (reports) => {
  if (reports.length) {
    var reportsWithAccountedFinances = reports.filter(
      (report) => report.isFinancesAccounted,
    );

    if (reportsWithAccountedFinances.length) {
      var accountedFinances = sortReportsByAccountingDate(
        reportsWithAccountedFinances,
      );

      showLastAccountedFinancesPanel();

      var lastAccountedFinancesReport = accountedFinances.shift();

      insertLastAccountedFinancesReportDataToPanel(lastAccountedFinancesReport);
      otherAccountedFinancesReportsModalWindowHandler(accountedFinances);
    }
  }
};

export default accountedFinancesPanelHandler;
