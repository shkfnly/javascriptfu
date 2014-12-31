/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;

  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(arr, n) {
    return n === undefined ? arr[0] : arr.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(arr, n) {
    if(n === undefined){
      return arr[arr.length-1];
    }
    else if (n === 0){
      return [];
    }
    else {
      return arr.slice(-1 * n);
    }

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(input, iterator) {
    if(Array.isArray(input))
    for(var i = 0; i < input.length; i ++){
      iterator(input[i], i, input);
    }
    else {
      for (var key in input){
        iterator(input[key], key, input);
      }
    } 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(arr, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1
    _.each(arr, function(item, index){
      if(item === target && result === -1){
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(arr, condition) {
    var result = []
    _.each(arr, function(item){
      if(condition(item)){
        result.push(item);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(arr, condition) {
    return _.filter(arr, function(input){
      return ! condition(input);
      })

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(arr) {
    var result = [];
    _.each(arr, function(item){
      if (result.indexOf(item) === -1){
        result.push(item);
      }
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, func) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = []
    _.each(collection, function(item){
      result.push(func(item));
    })
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(arr, prop) {
    return _.map(arr, function(item){
      return item[prop];
    });
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.

  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(array, methodName, args) {
    var result = [];
      _.each(array, function(item){
        var func = typeof methodName === 'string' ?
          item[methodName] : methodName
        result.push(func.apply(item, args));
      });
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
      _.each(collection, function(item){
        accumulator = iterator(accumulator, item);
      });
      return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, callback) {
    // TIP: Try re-using reduce() here.
    callback = callback || _.identity
    return _.reduce(collection, function(result, item){
      return result && !!callback(item);
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, callback) {
    // TIP: There's a very clever way to re-use every() here.
    callback = callback || _.identity
    return !_.every(collection, function(item){
      return !callback(item);
    })
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(arg){
      _.each(arg, function(value, key){
          obj[key] = value;
        })
      });
    return obj;
   };
    

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj1) {
    for( var i = 1; i < arguments.length; i++){
      for (var key in arguments[i]){
        (obj1[key] === undefined) ? obj1[key] = arguments[i][key] : obj1[key];
      };
    };
    return obj1;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
      // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
      var ran = false;
      var value;
      
      // var new_func = function(arg){
        
      //   while(ran === false){
      //     value = arg;
      //     ran = true;
      //   };
      //   return value;
      // };
      // return new_func;
      return function(){
        if (!ran){
          value = func.apply(this, arguments);
          ran = true;
        }
        return value;
      }
    

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.

        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.

      // The new function always returns the originally computed result.

  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  // _.memoize = function(func) {
  //   return func;
  //   // var memoized = {};
  //   // if (memoized[func]) {
  //   //   return memoized[func];
  //   // } else {
  //   //   memoized[func] = func;
  //   //   return func;
  //   // }
  // };

  _.memoize = function() {

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, delay) {
    //WTF is THIS? WHAT the fuck is apply doing
    // Why does the other one return undefined?
    // s
    var args = [].splice.call(arguments, 2);
    
    return setTimeout(function(){
      func.apply(null, args);
    }, delay);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function() {

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function() {

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  // _.zip = function() {
  //   var arg = arguments.length;
  //   var result = [];
  //   _.each(arguments, function(item) {
  //     var result2 = [];
  //     result2.length = arg;
  //     _.each(item, function(value, index) {
  //       result2[index] = value;
  //     });
  //     result.push(result2);
  //   });
  //   return result;
  // };

  _.zip = function() {

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function() {

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // Note: this solution doesn't account for arrays with the same value multiple times
    // ex. _.intersection(['moe', 'moe'], []);

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function() {
    // var results = [];
    // var args = _.flatten(Array.prototype.slice.call(arguments, 1)).sort();
    // _.each(array, function(item) {
    //   if(_.every(args, function(){item !== args;}){
    //     results.push(item);
    //   });
    // });
    // return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function() {

  };

}).call(this);
