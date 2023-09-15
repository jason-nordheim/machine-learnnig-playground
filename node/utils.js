const formatPercent = (value) => {
  return (value * 100).toFixed(2);
};

export const utils = {
  printProgress: (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = formatPercent(count / max);
    process.stdout.write(`${count}/${max} (${percent}%)`);
  },
};
