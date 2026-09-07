import assert from "node:assert";
import { it, describe } from "node:test";
import checkTokenExpiry from "../../src/server/routes/WBToken/services/utils/checkTokenExpiry.js";

describe("checkTokenExpiry", () => {
  it("exp: 0", () => {
    assert.deepStrictEqual({ isExpired: true }, checkTokenExpiry({ exp: 0 }));
  });

  it("exp: Date.now()", () => {
    var exp = Math.floor(Date.now() / 1000);
    assert.deepStrictEqual({ isExpired: true }, checkTokenExpiry({ exp }));
  });

  it("exp: Date.now() + 1000 ms", () => {
    var exp = Math.floor((Date.now() + 1000) / 1000);
    assert.deepStrictEqual({ isExpired: false }, checkTokenExpiry({ exp }));
  });
});
