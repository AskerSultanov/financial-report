import navigateTo from "../utils/navigateTo.js";
import sendRegistationData from "./sendRegistationData.js";

var registrationFormHandler = async () =>
  (document.getElementById("registration-form").onsubmit = async (e) => {
    e.preventDefault();

    var login = document.getElementById("login").value;

    if(!login) {
      alert('Придумайте логин')
      return 
    }

    var passwd = document.getElementById("passwd").value;

    if(!passwd){
      alert('Придумайте пароль')
      return 
    }

    var redirectUrl = await sendRegistationData(login, passwd);

    if (!redirectUrl) {
      return;
    }

    navigateTo(redirectUrl);
  });

registrationFormHandler();
