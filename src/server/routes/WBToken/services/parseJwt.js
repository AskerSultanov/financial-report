// Source - https://stackoverflow.com/a/38552302
// Posted by Peheje, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-23, License - CC BY-SA 4.0

// Source - https://stackoverflow.com/a/38552302
// Posted by Peheje, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-23, License - CC BY-SA 4.0

var parseJwt = (token) => JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

export default parseJwt;
