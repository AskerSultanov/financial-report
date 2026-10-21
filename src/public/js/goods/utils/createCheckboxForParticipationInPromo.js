import doRequest from "../../utils/doRequest.js";
import getCurrentDayMSK from "./getCurrentDayMSK.js";

var yes = "да";
var no = "нет";
var userId = document.cookie.split("=")[1];
var url = "/goods/status-of-participation-in-promo/";
var weekDaySelector = document.getElementById("week-days-select");

var getSelectedWeekDayIndex = () => {
  var selectedWeedDayIndex;

  for (var weekDay of weekDaySelector) {
    if (weekDay.selected) {
      selectedWeedDayIndex = +weekDay.value;
      break;
    }
  }

  if (
    !selectedWeedDayIndex &&
    typeof selectedWeedDayIndex !== "number" &&
    !isNaN(selectedWeedDayIndex)
  ) {
    var { currentDayIndex } = getCurrentDayMSK();
    selectedWeedDayIndex = currentDayIndex;
  }

  return { selectedWeedDayIndex };
};

var createCheckboxForParticipationInPromo = (
  sku,
  changePriceIfInPromo,
  needWrapIntoFieldset = false,
) => {
  var { id, skuName } = sku;

  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = "checkbox-" + skuName;
  input.checked = changePriceIfInPromo;

  var label = document.createElement("label");
  label.htmlFor = "checkbox-" + skuName;
  label.className = skuName;
  label.textContent = changePriceIfInPromo ? yes : no;
  label.id = "checkbox-label-participation-in-promo-" + skuName;

  input.addEventListener("click", async (e) => {
    var newStatus = input.checked;
    var newtextContent = newStatus ? yes : no;
    var labels = document.querySelectorAll("." + skuName);
    labels.forEach((label) => (label.textContent = newtextContent));

    if (!needWrapIntoFieldset) {
      var { selectedWeedDayIndex } = getSelectedWeekDayIndex();
      var res = await doRequest(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          skuId: sku.id,
          checkedWeekDays: [selectedWeedDayIndex],
          skuDataToUpdate: { changePriceIfInPromo: input.checked },
        }),
      });

      if (res.status !== 200) {
        input.checked = !newStatus;
        labels.forEach((label) => (label.textContent = !newStatus ? yes : no));
        alert("Не удалось изменить статус участия в акции при изменении цены");
        return;
      }
    }
  });

  var div = document.createElement("div");
  div.append(input, label);

  if (needWrapIntoFieldset) {
    var legend = document.createElement("legend");
    legend.append("Изменить цену если в акции");

    var fieldset = document.createElement("fieldset");
    fieldset.append(legend, div);
    return fieldset;
  } else {
    return div;
  }
};

export default createCheckboxForParticipationInPromo;
