
function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  
  var colIndexes=[];
  var tempObj={};
  
  for (var i in collection){
    var colKeys = Object.keys(collection[i]);
    var srcKeys = Object.keys(source);
    //return collection[i];
    //return colKeys;
    var isFound=[];//array containing bools of keys/values matched
    for (var keyID in srcKeys) {
      if (collection[i].hasOwnProperty(srcKeys[keyID])){
        //return collection[i][colKeys[keyID]];
        //found key
        if (source[srcKeys[keyID]]===collection[i][srcKeys[keyID]]) {
          //return collection[i][colKeys[keyID]];
          //found value, add tag to source
          isFound.push(1);
        } else {
          isFound.push(0);
        } 

      } else {
        isFound.push(0);
      }

    }
    
    var sumIsFound = 0;
    for (var k in isFound){
      sumIsFound+=isFound[k];
    }
    
    //return srcKeys.length;
    if (sumIsFound===srcKeys.length) {
      arr.push(collection[i]);
    }
    
    //return sumIsFound;

  }
  
  //return colIndexes;
  
  
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Capulet" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
