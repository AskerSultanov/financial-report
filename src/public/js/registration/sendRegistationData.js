var sendRegistationData = async (login, passwd) => {
  var res = await fetch("/reg/new", {
    method: "POST",
    body: JSON.stringify({ login, passwd }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 400) {
    var { errorText } = await res.json();
    alert(errorText);
    return;
  } else if (res.status == 409) {
    alert(`Пользователь с ником ${login} уже существует`);
    return;
  }

  var { redirectUrl } = await res.json();

  return redirectUrl;
};

export default sendRegistationData;
