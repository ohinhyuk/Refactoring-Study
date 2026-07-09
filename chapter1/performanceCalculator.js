class PerformanceCalculator {
  constructor(aPerformance, play) {
    this.aPerformance = aPerformance;
    this.play = play;
  }

  get amount() {
    throw new Error("서브클래스로 마이그레이션 진행 했습니다.");
  }

  get volumeCredits() {
    let reult = 0;

    reult += Math.max(this.aPerformance.audience - 30, 0);

    return reult;
  }
}

module.exports = PerformanceCalculator;
