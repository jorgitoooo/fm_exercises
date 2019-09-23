function findAll(value, array) {
  if (!Array.isArray(array)) return [];

  let retArray = [];

  // Takes care of both null and undefined cases
  if (value == null) {
    retArray = array.filter(el => el == null);
  }

  // Takes care of both object and boolean cases
  else if (typeof value === 'object' || typeof value === 'boolean') {
    retArray = array.filter(el => el === value);
  }

  // Takes care of number case
  else if (typeof value === 'number') {
    if (Object.is(value, -0)) {
      retArray = array.filter(el => Object.is(-0, el));
    } else {
      retArray = array.filter(el => {
        if (!Number.isNaN(value) && value != -Infinity && value != Infinity) {
          if (typeof el === 'string')
            return el.trim().length > 0 && el == value;
          else return el == value;
        }

        return (Number.isNaN(value) && Number.isNaN(el)) || el === value;
      });
    }
  }

  // Takes care of string case
  else if (typeof value === 'string') {
    if (value.trim().length > 0) {
      retArray = array.filter(el => value == el);
    } else {
      retArray = array.filter(el => value === el);
    }
  }

  return retArray;
}

// tests:
var myObj = { a: 2 };

var values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  '',
  '0',
  '42',
  '42hello',
  'true',
  'NaN',
  true,
  false,
  myObj
];

console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
console.log(setsMatch(findAll(0, values), [0, '0']) === true);
console.log(setsMatch(findAll(-0, values), [-0]) === true);
console.log(setsMatch(findAll(13, values), [13]) === true);
console.log(setsMatch(findAll(42, values), [42, '42']) === true);
console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll('', values), ['']) === true);
console.log(setsMatch(findAll('0', values), [0, '0']) === true);
console.log(setsMatch(findAll('42', values), [42, '42']) === true);
console.log(setsMatch(findAll('42hello', values), ['42hello']) === true);
console.log(setsMatch(findAll('true', values), ['true']) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(0, values), [0, -0]) === false);
console.log(setsMatch(findAll(42, values), [42, '42hello']) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(
  setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false
);
console.log(setsMatch(findAll('', values), ['', 0]) === false);
console.log(setsMatch(findAll('false', values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, 'true']) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);
// ***************************

function setsMatch(arr1, arr2) {
  if (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length == arr2.length
  ) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
