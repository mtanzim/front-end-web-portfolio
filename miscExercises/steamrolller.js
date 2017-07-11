function steamrollArray(arr) {
  // I'm a steamroller, baby
  
  var arrFlat = arr.reduce (function (a,b) {
    return a.concat(b);
  }, []);
  
  var i =0;
  console.log(arrFlat);
  
  var arrTemp=[];
  var tempArray=[];
  
  for (var j in arrFlat){
    tempArray=arrFlat[j];
    while (Array.isArray(tempArray) && i < 10){
      tempArray=tempArray[0];
    //console.log(tempArray);
    i++;
    }
    console.log(tempArray);
    arrTemp.push(tempArray);
  }
  
  
   console.log('-------------------------');
  
  
  return arrTemp;
  
  
  
}
steamrollArray([1, [2], [3, [[4]]]]);
