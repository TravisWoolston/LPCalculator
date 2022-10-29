const equals = (display, result = 0, operator) => {
  if (display.length === 0) {
    console.log(`equals return: ${result}`);
    return result;
  }
  let currentVal = display.shift();
  operator = display.length > 0 ? display.shift() : operator;
  if (currentVal === "√") {
    return equals(display, Math.sqrt(operator));
  }
  if (!isNaN(operator)) {
    let hold = currentVal;
    currentVal = operator;
    operator = hold;
  }
  let next = !isNaN(display[0]) ? display.shift() : false;
  switch (true) {
    case operator === "+":
      if (next) {
        return equals(display, Number(currentVal) + Number(next));
      } else {
        return equals(display, Number(currentVal) + Number(result));
      }
    case operator === "-":
      result = result === 0 ? (result += Number(currentVal)) : result;
      if (next) {
        return equals(display, Number(result) - Number(next));
      } else {
        return equals(display, Number(result) - Number(currentVal));
      }
    case operator === "X":
      result = result === 0 ? (result += Number(currentVal)) : result;
      if (next) {
        return equals(display, Number(currentVal) * Number(next));
      } else {
        return equals(display, Number(result) * Number(currentVal));
      }
    case operator === "/":
      result = result === 0 ? (result += Number(currentVal)) : result;
      if (next) {
        return equals(display, Number(currentVal) / Number(next));
      } else {
        return equals(display, Number(result) / Number(currentVal));
      }
    default:
      return result.toFixed(4);
  }
};
export default equals;
