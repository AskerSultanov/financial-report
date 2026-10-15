var dateFromInput = document.getElementById("dateFrom");
var dateToInput = document.getElementById("dateTo");
var datepickerArea = document.getElementById("dialog-datepicker-area");

var dateFromDatepicker;
var dateToDatepicker;

var wrapInputElementsIntoDatepicker = () => {
  dateFromDatepicker?.destroy();
  dateToDatepicker?.destroy();

  dateFromDatepicker = new Datepicker(dateFromInput, {
    container: datepickerArea,
    language: "ru",
    format: "yyyy-mm-dd",
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isMonday = date.getDay() === 1;

      return {
        enabled: isMonday,
      };
    },
  });

  dateToDatepicker = new Datepicker(dateToInput, {
    container: datepickerArea,
    language: "ru",
    format: "yyyy-mm-dd",
    autoFocus: false,
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isSunday = date.getDay() === 0;

      return {
        enabled: isSunday,
      };
    },
  });
};

export default wrapInputElementsIntoDatepicker;
