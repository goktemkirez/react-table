import { sortAsc } from "./sorting";

export function areObjectsEqual(object1, object2) {
  return (
    Object.keys(object1).length === Object.keys(object2).length &&
    Object.keys(object1).every((p) => object1[p] === object2[p])
  );
}

export function areObjectArraysEqual(array1, array2, columnName) {
  let tempArr1 = sortAsc(array1, columnName);
  let tempArr2 = sortAsc(array2, columnName);

  return (
    tempArr1.length === tempArr2.length &&
    tempArr1.every((o, idx) => areObjectsEqual(o, tempArr2[idx]))
  );
}

export function notExistInFirstArray(array1, array2, columnName) {
    var result = array2.filter(function(obj) {
        return !array1.some(function(obj2) {
            return obj[columnName] == obj2[columnName];
        });
    });

    return result
}

export function notExistInSecondArray(array1, array2, columnName) {
    var result = array1.filter(function(obj) {
        return !array2.some(function(obj2) {
            return obj[columnName] == obj2[columnName];
        });
    });

    return result
}

