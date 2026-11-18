var sortReportsByAccountingDate = (reports) =>
  reports.sort((a, b) => b.financesAccountedAt - a.financesAccountedAt);

export default sortReportsByAccountingDate;
