const cal = require("./cal");
const func = require("./func"); // 한번 호출 -> 보관 -> 바로 삭제

// console.log(cal.add(5, 3));
// console.log(cal.sub(5, 3));
// console.log(cal.mul(5, 3));

// console.log(func);

for (let i = 0; i < 10; i++) {
  console.log(func());
}
