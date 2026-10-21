import navigateTo from "../../utils/navigateTo.js";

var button = document.getElementById("goods-page");

var getGoodsPageButtonHandler = () => {
  button.addEventListener("click", () => {
    navigateTo("/goods");
  });
};

export default getGoodsPageButtonHandler;
