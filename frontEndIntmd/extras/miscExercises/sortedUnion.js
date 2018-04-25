
function removeDup(arr, element) {
  arrTags = [];
  console.log('operating on index: ' + element);
  console.log('before: ' + arr);
  for (var i = element + 1; i <= arr.length; i++) {
    if (arr[i] === element) {
      console.log('matched element: ' + i);
      arrTags.push(i);
    }
  }


  //problem is here, can't loop and splice
  for (var j = arrTags.length - 1; j >= 0; j--) {
    arr.splice(arrTags[j], 1);
  }

  console.log('after: ' + arr);
  return arr;

}

function uniteUnique(arr) {

  //console.log(arr);
  var allArr = [];
  for (var i in arguments) {
    //console.log(arguments[i]);
    allArr.push(arguments[i]);
  }

  //console.log(allArr);

  var flat = allArr.reduce(function (a, b) {
    return a.concat(b);
  }, []);

  console.log(flat);
  arrTags = [];

  isDone = false;
  var loopIt = 0;
  var flatSpliced = flat;
  while (!isDone) {
    if (loopIt === flat.length) {
      isDone = true;
    }
    flatSpliced = removeDup(flatSpliced, flatSpliced[loopIt]);
    loopIt++;
  }

  console.log('sliced:' + flatSpliced);


  return flatSpliced;

}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
