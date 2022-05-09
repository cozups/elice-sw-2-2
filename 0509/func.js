// let number = 0;

// module.exports = number += 1;
// 얘는 함수가 아니다. 함수가 아니라고 인식

let number = 0;

module.exports = () => {
  return (number += 1);
};
// 함수형이므로 함수로 인식하고 계속 남게됨.
