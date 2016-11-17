/**
 * [updateWriteOpResult 用来处理 updateWriteOpResult, 如果没有得到期望的结果就抛出异常]
 * @method updateWriteOpResult
 * @author chengjianhua<w.chengjianhua@gmail.com>
 * @date   2016-11-17
 * @param  {[Number]}            matchedCount  [description]
 * @param  {[Number]}            modifiedCount [description]
 * @return {[Boolean]}                          [description]
 */
export function updateWriteOpResult({matchedCount, modifiedCount}) {
  let errMessage = '';

  if (matchedCount === 0) {
    errMessage = 'There is not a matched document existing.';
    throw new Error(errMessage);
  } else {
    if (modifiedCount === 0) {
      errMessage = 'No document has been updated.';
      throw new Error(errMessage);
    } else {
      return true;
    }
  }
}

export default {
  updateWriteOpResult,
};
