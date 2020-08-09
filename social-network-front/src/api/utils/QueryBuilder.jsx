function getQueryString(index, param, value) {
  if (value) {
    let sign = index === 0 ? "?" : "&";
    return `${sign}${param}=${value}`;
  } else {
    return "";
  }
}

export function QueryBuilder(queries = {}) {
  let queryParams = Object.keys(queries);
  let builtQueries = "";

  builtQueries = queryParams
    .map((param, index) => getQueryString(index, param, queries[param]))
    .join("");

  return builtQueries;
}
