import doRequest from "../../../../../utils/doRequest.js";

var url = "/report/bulk-editable";

var sendBulkEditableData = async (
  userId,
  reportId,
  updateField,
  newValue,
  skusToUpdate,
) => {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      reportId,
      updateField,
      newValue,
      skusToUpdate,
    }),
  };

  var res = await doRequest(url, options);

  var { updatedSkus } = await res.json();

  return { updatedSkus };
};

export default sendBulkEditableData;
