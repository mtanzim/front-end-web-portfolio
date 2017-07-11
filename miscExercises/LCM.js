function smallestCommons(arr) {
  var newArr=arr.sort();
  console.log(newArr);
  
  var start=newArr[0]*newArr[1];
  var increment=newArr[1];
  isLoop=true;
  
  var i=start;
  while (isLoop){
    i+=increment;
    //console.log('i:'+i);
    var k=0;
    for (var j=newArr[0]; j<= newArr[1];j++){
      //console.log('j:'+j);
      if (i%j===0){
        k++;
      }
      //console.log('j:'+j+',k:'+k);
      if (k===newArr[1]-newArr[0]+1){
        isLoop=false;
      }

    }
  }
  //console.log(i);
  return i;
        
  
}

smallestCommons([1,5]);