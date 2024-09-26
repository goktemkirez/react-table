export function sortAsc(data, columnName) {
  let tempData = [...data];

  tempData.sort((a, b) => {
    if (a[columnName] == b[columnName]) return 0;
    if (a[columnName] == null) return -1;
    if (b[columnName] == null) return 1;
    if (typeof b[columnName] == "number") return a[columnName] - b[columnName];
    if (typeof b[columnName] == "boolean") return (a === b)? 0 : a? -1 : 1;
    return a[columnName].localeCompare(b[columnName]);
  });

  return tempData;
}

export function sortDesc(data, columnName) {
  let tempData = [...data];

  tempData.sort((a, b) => {
    if (a[columnName] == b[columnName]) return 0;
    if (a[columnName] == null) return 1;
    if (b[columnName] == null) return -1;
    if (typeof b[columnName] == "number") return b[columnName] - a[columnName];
    if (typeof b[columnName] == "boolean") return (a === b)? 0 : a? -1 : 1;
    return b[columnName].localeCompare(a[columnName]);
  });

  return tempData;
}
