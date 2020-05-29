const { sum, sumOf } = require('./sum');

it('Calculates 1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3);
});

it('Calculate 1+2+3+4+5 = 15', () => {
  const array = [1, 2, 3, 4, 5];
  expect(sumOf(array)).toBe(15);
});

// test 새로운 테스트 케이스, expect ~ 일 것이다. , toBe 예상되는 값;
