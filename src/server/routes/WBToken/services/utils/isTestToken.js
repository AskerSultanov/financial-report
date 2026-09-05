var testTokenValue = 2; //https://dev.wildberries.ru/docs/openapi/api-information#tag/Avtorizaciya/Kak-ustroen-token

var isTestToken = (token) => token.acc === testTokenValue;

export default isTestToken;
