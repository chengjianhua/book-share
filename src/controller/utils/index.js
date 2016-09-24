
/**
 * [formatJson format return data]
 * @method formatJson
 * @author chengjianhua
 * @date   2016-09-24
 * @param  {Boolean}      isSuccess [is successful.]
 * @param  {[String]}       message   [message]
 * @param  {[Object]}       payload   [the data you want to response to client]
 * @return {[Object]}
 */
export function formatJson(isSuccess, message, payload) {
  return Object.assign({}, {isSuccess, message}, payload);
}
