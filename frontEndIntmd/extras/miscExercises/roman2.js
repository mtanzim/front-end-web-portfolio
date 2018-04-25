function convertToRoman(num) {
  var denums = { 1000: 'M', 900: 'CM', 500: 'D', 100: 'C', 90: 'XC', 40: 'XL', 50: 'L', 10: 'X', 9: 'IX', 5: 'V', 1: 'I' };
  var orderedKeys = [1000, 900, 500, 100, 90, 50, 40, 10, 9, 5, 1];
  //console.log(denums);
  console.log('decoding: ' + num);
  //console.log(Object.keys(denums).reverse());
  var romans = [];
  var romanChars = [];
  var newNum = num;
  var difference = 0;
  var nextElem = '';

  //Object.keys(denums).reverse().forEach(function(element) {
  //console.log(denums.length);
  var m = 0;
  while (m < orderedKeys.length) {
    var remainder = 0;
    var intDiv = 0;
    var element = orderedKeys[m];

    console.log('element is: ' + element);

    remainder = newNum % element;
    intDiv = Math.floor(newNum / element);
    console.log('intDiv: ' + intDiv);
    console.log('remainder: ' + remainder);
    if (intDiv <= 3) {
      for (var i = 0; i < intDiv; i++) {
        romanChars.push(denums[element]);
      }
    }
    else {
      nextElem = denums[orderedKeys[m - 1]];
      difference = parseInt(orderedKeys[m - 1] - intDiv);

      for (var k = 0; k < difference; k++) {
        romanChars.push(denums[element]);
      }
      romanChars.push(nextElem);

    }

    console.log(romanChars);
    romans.push(romanChars);
    romanChars = [];

    newNum = remainder;

    m++;

  }


  console.log(romans.toString().replace(/,/g, ""));
  console.log("END!!!!!!!!!!!!");
  return (romans.toString().replace(/,/g, ""));


}

convertToRoman(3999);

