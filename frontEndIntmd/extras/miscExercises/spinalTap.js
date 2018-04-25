function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  //var regex = / |_/g;
  //var str2= str.replace(regex,'');
  var regex2 = /[A-Z]|_| /g;
  var str3 = str.replace(regex2, '-' + '$&').toLowerCase();
  //return str.replace(regex,'-').toLowerCase();
  var str4 = '';
  //console.log(str3);
  if (str3[0] == '-') {
    //console.log('came here')
    str4 = str3.replace('-', '');
    //console.log(str4);
  } else {
    str4 = str3;
  }
  console.log(str4.replace(/ -|_-| /g, ''));
  return str4.replace(/ -|_-| /g, '');
}

spinalCase('This Is Spinal Tap');