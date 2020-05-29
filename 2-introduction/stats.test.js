const stats = require('./stats');

describe('stats', () => {
  it('get maximum value', () => {
    expect(stats.max([1, 2, 3, 4])).toBe(4);
  });
  it('get minimum value', () => {
    expect(stats.min([1, 2, 3, 4])).toBe(1);
  });
  it('Get average value', () => {
    expect(stats.average([1, 2, 3, 4])).toBe(2.5);
  });

  describe('midian', () => {
    it('sorts the array by ascending', () => {
      expect(stats.sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
    });
    it('gets the midian for odd length', () => {
      expect(stats.midian([1, 2, 3, 4, 5])).toBe(3);
    });
    it('gets the midian for even length', () => {
      expect(stats.midian([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });
  });

  describe('mode', () => {
    it('has one mode', () => {
      expect(stats.mode([1, 2, 2, 2, 3])).toBe(2);
    });
    it('has no mode', () => {
      expect(stats.mode([1, 2, 3, 4, 5])).toBe(null);
    });
    it('has multiple mode', () => {
      expect(stats.mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
