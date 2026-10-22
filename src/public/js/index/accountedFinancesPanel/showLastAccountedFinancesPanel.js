var panel = `
      <div id="last-accounted-finances-report-header">Последний отчёт с учтенными финансами</div>
      <div id="last-accounted-finances-report-body">
        <div id="finances-accounted-at">Финансы учтены: </div>
        <div id="report-period">Отчётный период: </div>
        <div class="last-accounted-finances-report-link-wrapper">
          <button class="link-to-report" id="link-to-report">перейти к отчёту</button>
          <button id="other-accounted-finances-reports">другие отчёты</button>
        </div>
    </div>`;

var showLastAccountedFinancesPanel = () =>
  (document.getElementById("last-accounted-finances-report").innerHTML = panel);

export default showLastAccountedFinancesPanel;
