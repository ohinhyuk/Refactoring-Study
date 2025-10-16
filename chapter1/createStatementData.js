function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;

  statementData.performances =
    statementData.performances.map(enrichPerformance);

  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumne = totalVolumneCredits(statementData);

  return statementData;

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);

    result.play = playFor(aPerformance).name;
    result.amount = amountFor(aPerformance);
    result.volumeCredits = volumneCreditsFor(aPerformance);

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        result += 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function volumneCreditsFor(aPerformance) {
    let reult = 0;

    reult += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      reult += Math.floor(aPerformance.audience / 5);

    return reult;
  }

  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }

  function totalVolumneCredits(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }
    return result;
  }
}

module.exports = createStatementData;
