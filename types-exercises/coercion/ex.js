function isValidName(name) {
  if (typeof name === typeof String()) {
    let localName = String(name);

    localName = localName.trimStart();
    localName = localName.trimEnd();

    return localName.length >= 3;
  }
  return false;
}

function hoursAttended(attended, length) {
  let p1IsValid = validType(attended);
  let p2IsValid = validType(length);

  if (p1IsValid && p2IsValid) {
    let p1 = convertToInteger(attended);
    let p2 = convertToInteger(length);

    return p1 >= 0 && p2 >= 0 && p1 <= p2;
  }

  return false;

  function convertToInteger(param) {
    if (typeof param === typeof String()) {
      let tmpStr = String(param);

      tmpStr = tmpStr.trimStart();
      tmpStr = tmpStr.trimEnd();

      if (
        tmpStr.length < 1 ||
        Number.isNaN(tmpStr) ||
        !Number.isInteger(Number(tmpStr))
      )
        return -1;

      return Number(tmpStr);
    }
    return Number.isInteger(param) ? param : -1;
  }

  function validType(param) {
    return (
      (typeof param === typeof String() || typeof param === typeof Number()) &&
      !Number.isNaN(param)
    );
  }
}

// tests:
console.log(isValidName('Frank') === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, '10') === true);
console.log(hoursAttended('6', 10) === true);
console.log(hoursAttended('6', '10') === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName('') === false);
console.log(isValidName('  \t\n') === false);
console.log(isValidName('X') === false);
console.log(hoursAttended('', 6) === false);
console.log(hoursAttended(6, '') === false);
console.log(hoursAttended('', '') === false);
console.log(hoursAttended('foo', 6) === false);
console.log(hoursAttended(6, 'foo') === false);
console.log(hoursAttended('foo', 'bar') === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, '6') === false);
console.log(hoursAttended('10', 6) === false);
console.log(hoursAttended('10', '6') === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, '10.1') === false);
console.log(hoursAttended('6.1', 10) === false);
console.log(hoursAttended('6.1', '10.1') === false);
