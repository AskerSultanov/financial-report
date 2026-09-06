import { fontStyles, alignmentStyles } from "./styles.js";

var titles = ["Артикул", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

var writeTitles = (ws) => {
  ws.addRow(titles).font = fontStyles;
  ws.getRow(1).alignment = alignmentStyles;

  return ws;
};

export default writeTitles;
