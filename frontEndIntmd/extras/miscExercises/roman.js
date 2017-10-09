 
//found on stack overflow
var next = function(db, key) {
  console.log('came to next');
  console.log(key);
  console.log(db[key]);
  console.log(Object.keys(db).length);
  for (var i = 0; i < Object.keys(db).length; i++) {
    console.log ('came to loop');
    if (Object.keys(db)[i] === key) {
      //console.log (db[Object.keys(db)[i+1]]);
      return db[Object.keys(db)[i+1]];
    }
  }
};


function convertToRoman(num) {
  var denums= {1000:'M', 500:'D', 100:'C',50:'L',10:'X',5:'V',1:'I'};
  //console.log(denums);
  console.log('decoding: '+num);
  console.log(Object.keys(denums).reverse());
  var romans=[];
  var romanChars=[];
  var newNum=num;
  
  Object.keys(denums).reverse().forEach(function(element) {
    var remainder=0;
    var intDiv=0;
    //console.log(element);
    if (newNum >= element){
      remainder=newNum%element;
      intDiv=Math.floor(newNum/element);
      console.log('intDiv: '+intDiv);
      console.log('remainder: '+remainder);
      if (intDiv <= 3){
        for (var i=0; i <intDiv; i++) {
          romanChars.push(denums[element]);
        }
      } else {
        //console.log ('error case found, current roman element is: '+denums[element]);
        console.log ('error case found, next roman element is: '+next(denums,element));
      }
      
      console.log(romanChars);
      romans.push(romanChars);
      romanChars=[];
      
      newNum=remainder;
      
    } else {
      //console.log (element + " is not a valid denum");
    }
    
  });
  console.log(romans.toString().replace(/,/g , ""));
  console.log("END!!!!!!!!!!!!");
  return (romans.toString().replace(/,/g , ""));
  
  
}

convertToRoman(649);
