var numberOfTokenParts = 3;

var isPresumablyJwtToken = (token) => {
  if (typeof token !== "string") {
    return;
  }

  var tokenHasThreeParts = token.split(".").length === numberOfTokenParts;

  if (!tokenHasThreeParts) {
    return;
  }

  return true;
};

export default isPresumablyJwtToken;
