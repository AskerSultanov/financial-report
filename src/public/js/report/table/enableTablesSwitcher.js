var enableTablesSwitcher = (years) => {
  var switcher = document.createElement("nav");
  switcher.className = "tabs";
  switcher.ariaLabel = "Переключение таблиц";

  var isFirstItem = true;

  for (var year of years) {
    var button = document.createElement("button");
    button.id = year;
    button.type = "button";
    button.className = "tab";
    button.textContent = "Отчет за " + year;

    if (isFirstItem) {
      button.ariaSelected = true;
      isFirstItem = false;
    } else {
      button.ariaSelected = false;
    }

    switcher.append(button);
  }

  document.body.prepend(switcher);
};

export default enableTablesSwitcher;
