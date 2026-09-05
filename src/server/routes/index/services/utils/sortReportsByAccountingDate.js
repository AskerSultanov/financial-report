var sortReportsByAccountingDate = (reportsWithAccountedFinances) =>
  reportsWithAccountedFinances.sort((a, b) => b.financesAccountedAt - a.financesAccountedAt);

export default sortReportsByAccountingDate;
