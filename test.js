/* eslint-disable */
console.time('Without bitwise');
for (let i = 0; i < 100000000; i++) {
  let floatNum = 1.34;
  floatNum = Math.floor(floatNum);
}
console.timeEnd('Without bitwise');

console.time('With bitwise');
for (let i = 0; i < 100000000; i++) {
  let floatNum = 1.34;
  floatNum = ~~ (0.5 + floatNum);
}
console.timeEnd('With bitwise');
