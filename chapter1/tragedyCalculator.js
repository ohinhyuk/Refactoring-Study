const PerformanceCalculator = require("./performanceCalculator.js");

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 0;
    result += 40000;
    if (this.aPerformance.audience > 30) {
      result += 1000 * (this.aPerformance.audience - 30);
    }
    return result;
  }
}

module.exports = TragedyCalculator;
