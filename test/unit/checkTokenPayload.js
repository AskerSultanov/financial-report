import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { it, describe } from "node:test";
import checkTokenPayload from "../../src/server/routes/WBToken/services/utils/checkTokenPayload.js";

var tokenPayload = {
  acc: 1,
  ent: 1,
  exp: 1,
  for: "self",
  iid: 1,
  oid: 1,
  s: 1,
  t: true,
  uid: 1,
  //id uuid
  //sid uuid
};

describe("checkTokenPayload", () => {
  it("empty object", () => {
    assert.deepStrictEqual({ payloadIsInvalid: true }, checkTokenPayload({}));
  });

  it("id and sid missing", () => {
    assert.deepStrictEqual(
      { payloadIsInvalid: true },
      checkTokenPayload(tokenPayload),
    );
  });

  it("valid payload", () => {
    tokenPayload.id = randomUUID();
    tokenPayload.sid = randomUUID();

    assert.deepStrictEqual(
      { payloadIsInvalid: false },
      checkTokenPayload(tokenPayload),
    );
  });
});
