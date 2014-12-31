var once = function(func) {
  var new_func = function(func){
    var ran = false;
    var value;
    while(ran === false){
      value = func();
      ran = true;
    };
    return value;
  };
  return new_func;
};


var num = 0;
var increment = once(function(){
  num += 1;
});

increment();
increment();

console.log(num);
