import assert from 'assert';

describe('Boot Test', () => {
  it('should be true at project boot', () => {
    const a = 1;
    assert(a === 1);
  });
});
