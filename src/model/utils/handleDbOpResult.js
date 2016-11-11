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
