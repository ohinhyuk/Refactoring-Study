const statement = require("../index.js");
const plays = require("../plays.json");
const invoices = require("../invoices.json");

const test = require("node:test");
const assert = require("node:assert");

const result = `청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $580.00 (35석)
 Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

test("statement 테스트", (t) => {
  assert.strictEqual(result, statement(invoices[0], plays));
});
