const equals = (display, result = 0, operator) => {
  if (display.length === 0) {
    console.log(`equals return: ${result}`);
    return result;
  }
  console.log(`equals: display/result ${display}, ${result}`);
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
  console.log("currentVal/operator", currentVal, operator);
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
      console.log("case X");
      result = result === 0 ? (result += Number(currentVal)) : result;
      if (next) {
        return equals(display, Number(currentVal) * Number(next));
      } else {
        return equals(display, Number(result) * Number(currentVal));
      }
    case operator === "/":
      console.log("case /");
      console.log(result, "/", currentVal, `next: ${next}`);
      result = result === 0 ? (result += Number(currentVal)) : result;
      if (next) {
        return equals(display, Number(currentVal) / Number(next));
      } else {
        return equals(display, Number(result) / Number(currentVal));
      }
    default:
      return result;
  }
};
export default equals;
