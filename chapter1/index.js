const createStatementData = require("./createStatementData");

// Dispatcher function to handle different formats
const statement = (invoice, plays, format = "text") => {
  const renderers = {
    text: renderPlainText,
    html: renderHtml,
  };

  const renderer = renderers[format];
  if (!renderer) {
    throw new Error(`Unknown format: ${format}`);
  }

  return renderer(createStatementData(invoice, plays));
};

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumne}점\n`;

  return result;
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n";
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play}</td><td>(${perf.audience}석)</td><td>\n`;
    result += `${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumne}</em>점</p>\n`;

  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

module.exports = statement;
