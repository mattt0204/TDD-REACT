function max(numbers) {
  return Math.max(...numbers);
}
exports.max = max;

exports.min = (numbers) => Math.min(...numbers);

exports.average = (numbers) =>
  numbers.reduce((acc, curr, index, { length }) => acc + curr / length, 0);

exports.sort = (numbers) => numbers.sort((a, b) => a - b);

exports.midian = (numbers) => {
  // even

  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  } else {
    return numbers[middle];
  }
};

exports.mode = (numbers) => {
  const counts = numbers.reduce(
    (acc, curr) => acc.set(curr, acc.get(curr) + 1 || 1),
    new Map()
  );

  const maxCount = Math.max(...counts.values());

  const modes = [...counts.keys()].filter(
    (number) => counts.get(number) === maxCount
  );

  console.log(counts);
  if (modes.length === numbers.length) {
    return null;
  }
  if (modes.length > 1) {
    return modes;
  }
  return modes[0];
};
