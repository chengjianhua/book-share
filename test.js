import {handleDbOpResult as handlers} from './src/model/utils';

const result = (matchedCount, modifiedCount) => ({
  matchedCount, modifiedCount,
});

try {
  handlers.updateWriteOpResult(result(0, 0));
} catch (e) {
  console.error(e.message);
}

// async function f() {
//   // throw new Error('出错了');
//   await Promise.reject('asdasd');
//   console.log('code after throw expression is called.');
// }
//
// async function g() {
//   try {
//     const fResult = await f();
//     console.log('dddd', fResult);
//   } catch (err) {
//     console.log('catched error. \n\n', err);
//   }
// }
//
// g();
