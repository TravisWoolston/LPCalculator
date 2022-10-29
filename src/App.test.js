import equals from "./operations/equals"

describe('/operations/equals functionality', () => {
  test('addition and subtraction', () => {
    expect(equals([2, "+", 2])).toBe(4);
    expect(equals([2, "+", 2, "+", 2])).toBe(6)
    expect(equals([6, "-", 2])).toBe(4)
    expect(equals([10, "-", 4])).toBe(6)
  });
  test('multiplication and division', () => {
    expect(equals([2, "X", 2])).toBe(4)
    expect(equals([3, "X", 3, "X", 4])).toBe(36)
    expect(equals([8, "/", 4])).toBe(2)
  })
})

