export function convertTurkishCharsToEn(text) {
  var Maps = {
    İ: "I",
    Ş: "S",
    Ç: "C",
    Ğ: "G",
    Ü: "U",
    Ö: "O",
    ı: "i",
    ş: "s",
    ç: "c",
    ğ: "g",
    ü: "u",
    ö: "o",
  };
  Object.keys(Maps).forEach(function (Old) {
    text = text?.replaceAll(Old, Maps[Old]);
  });
  return text;
}
