function printRecords(recordIds) {
  if (Array.isArray(recordIds)) {
    let students = [];

    recordIds.forEach(function retrieveStudent(id) {
      if (typeof id === 'number') {
        const student = studentRecords.find(function get(student) {
          return student.id == id;
        });

        if (student) students.push(student);
      }
    });
    students.sort(compareStudents);

    students.forEach(printStudent);
  } else {
    console.error(
      `Argument passed to func ${printRecords.name} is not an Array.`
    );
  }

  //------------------------------
  function printStudent(student) {
    const { name, id, paid } = student;

    console.log(`${name} (#${id}): ${paid ? 'Paid' : 'Not Paid'}`);
  }
  function compareStudents(student1, student2) {
    if (student1.name < student2.name) {
      return -1;
    } else if (student1.name > student2.name) {
      return 1;
    }
    return 0;
  }
}

function paidStudentsToEnroll() {
  return [
    ...currentEnrollment,
    ...studentRecords.reduce(studentsPaidButNotEnrolled, [])
  ];

  //--------------------------------------------
  function studentsPaidButNotEnrolled(students, student) {
    // if(!student || !student.id || student.paid != 'undefined') return false;

    return student.paid && !currentEnrollment.includes(student.id)
      ? [...students, student.id]
      : students;
  }
}

function remindUnpaid(recordIds) {
  printRecords(
    studentRecords.reduce(
      (students, student) =>
        !student.paid && recordIds.includes(student.id)
          ? [...students, student.id]
          : students,
      []
    )
  );
  return 1;
}

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: 'Frank', paid: true },
  { id: 410, name: 'Suzy', paid: true },
  { id: 709, name: 'Brian', paid: false },
  { id: 105, name: 'Henry', paid: false },
  { id: 502, name: 'Mary', paid: true },
  { id: 664, name: 'Bob', paid: false },
  { id: 250, name: 'Peter', paid: true },
  { id: 375, name: 'Sarah', paid: true },
  { id: 867, name: 'Greg', paid: false }
];

printRecords(currentEnrollment);
console.log('----');
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log('----');
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
