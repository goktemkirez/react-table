// ms ile bekletme

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Object Array den Value ya göre tekrar eden satırları kaldırma

export function getUniqueListByKey(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

// Gün Ekleme

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function addDays(date, days){
  return date.addDays(days)
}

// Get Random Color

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}