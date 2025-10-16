const PerformanceCalculator = require("./performanceCalculator");

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 0;
    result = 30000;
    if (this.aPerformance.audience > 20) {
      result += 10000 + 500 * (this.aPerformance.audience - 20);
    }
    result += 300 * this.aPerformance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.aPerformance.audience / 5);
  }
}

module.exports = ComedyCalculator;
