let score = 0;

export const scoreRef = {
  get value() {
    return score;
  },
  increase() {
    score++;
  },
  reset() {
    score = 0;
  },
};
