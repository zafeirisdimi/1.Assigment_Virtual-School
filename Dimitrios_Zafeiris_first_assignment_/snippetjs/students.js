let students = [];
// define the form field inputs
let studFname = document.getElementById ('StudFname');
let studLname = document.getElementById ('StudLname');
let studEmail = document.getElementById ('StudEmail');
let studPass = document.getElementById ('StudPass');
let studStart = document.getElementById ('StudStart');
let studEnd = document.getElementById ('StudEnd');
let studPhone = document.getElementById ('StudPhone');

let btnSubmit = document.getElementById ('submitFormStud');
btnSubmit.addEventListener ('click', submit);

let btnReset = document.getElementById ('resetFormStud');
btnReset.addEventListener ('click', reset);

let btnUpdate = document.getElementById ('updateFormStud');
btnUpdate.addEventListener ('click', update);

// let btnDelete = document.getElementById ('delete');
// btnDelete.addEventListener ('click', deleteStudent);

let divStudents = document.getElementById ('students');

// functional constructor - This means that we use this function in order to create objects
// of type Student
function Student (fname, lname, email, pass, start, end, phone) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.pass = pass;
  this.start = start;
  this.end = end;
  this.phone = phone;
}

function StudentToString (student) {
  return `${student.fname} ${student.lname} ${student.email} ${student.pass} ${student.start} ${student.end} ${student.phone}`;
  // return(Student.name + " " + Student.price + " " + Student.speed);
}
function StudentToToRow (student) {
  return `<td>${student.fname}</td><td>${student.lname}</td><td>${student.email}</td><td>${student.pass}</td><td>${student.start}<td>${student.end}</td><td>${student.phone}</td>`;
  // return(Student.name + " " + Student.price + " " + Student.speed);
}

function submit (event) {
  event.preventDefault (); // stops from refreshing
  const form = document.getElementById ('formAddStud');

  if (form.checkValidity ()) {
    document.getElementById ('mSuccessStud').innerHTML =
      '<i class="fa-solid fa-square-check"></i>&nbsp;Form is valid';
    document.getElementById ('mErrorStud').hidden = false;
    let myStudent = new Student (
      studFname.value,
      studLname.value,
      studEmail.value,
      studPass.value,
      studStart.value,
      studEnd.value,
      studPhone.value
    );
    students.push (myStudent);

    // create an HTML Element
    // create an Edit button
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.studentIndex = students.length - 1;
    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.studentIndex = students.length - 1;
    btnDelete.addEventListener ('click', deleteStudent);
    // somehow relate (bind) the button to an element of the array
    // append this HTML Element to document body
    createParagraphElement (myStudent, btnEdit, btnDelete);

    btnReset.click ();
    console.log (students);
  } else {
    document.getElementById ('mSuccessStud').hidden = true;
    document.getElementById ('mErrorStud').innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Something wrong happen, <br>refreshing your page';
  }
}
function reset (event) {
  console.log ('Form is reset');
  btnSubmit.textContent = 'Add';
}
function edit (event) {
  studFname.value = students[this.studentIndex].fname;
  studLname.value = students[this.studentIndex].lname;
  studEmail.value = students[this.studentIndex].email;
  studPass.value = students[this.studentIndex].pass;
  studStart.value = students[this.studentIndex].start;
  studEnd.value = students[this.studentIndex].end;
  studPhone.value = students[this.studentIndex].phone;

  btnUpdate.hidden = true;
  btnSubmit.hidden = false;
  btnUpdate.studentIndex = this.studentIndex;
  // btnUpdate.Student = new Student(lessonDescription.value, etc);
  console.log (StudentToString (students[this.studentIndex]));
}

function update (event) {
  event.preventDefault ();
  console.log (this.studentIndex);
  console.log (
    studentToString (
      new Student (
        studFname.value,
        studLname.value,
        studEmail.value,
        studPass.value,
        studStart.value,
        studEnd.value,
        studPhone.value
      )
    )
  );
  students[this.studentIndex] = new Student (
    studFname.value,
    studLname.value,
    studEmail.value,
    studPass.value,
    studStart.value,
    studEnd.value,
    studPhone.value
  );
  divStudents.innerHTML = '';
  for (let i = 0; i < students.length; i++) {
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.studentIndex = i;
    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.studentIndex = i;
    btnDelete.addEventListener ('click', deleteStudent);
    createParagraphElement (students[i], btnEdit, btnDelete);
  }
  btnUpdate.hidden = false;
  btnSubmit.hidden = true;
  btnReset.click ();

  document.getElementById ('mSuccessStud').innerHTML =
    '<i class="fa-regular fa-face-smile"></i>&nbsp;You have updated the assignment successfully';
}

function createParagraphElement (student, editButton, deleteButton) {
  createRowElement (student, editButton, deleteButton);
}

function createRowElement (student, editButton, deleteButton) {
  let tbody = document.getElementById ('students');
  let row = document.createElement ('tr');
  row.id = 'student' + students.indexOf (student);
  //bind Student ID to RowElement
  row.innerHTML = StudentToToRow (student);
  tbody.appendChild (row);
  let table = document.getElementById ('tableStudents');
  table.hidden = false;
  row.appendChild (editButton);
  row.appendChild (deleteButton);
}
function deleteStudent () {
  //remove the Student from the students list
  students.splice (this.studentIndex, 1);
  //remove from tableStudents
  let tbody = document.getElementById ('students');
  let row = document.getElementById (`student${this.studentIndex}`);
  tbody.removeChild (row);
  //check if students.length == 0 kai an tote hide ton table header
  if (students.length == 0) {
    let table = document.getElementById ('tableStudents');
    table.hidden = true;
    document.getElementById ('mDelStud').innerHTML =
      '<i class="fa-solid fa-trash-can"></i></i>&nbsp;&nbsp;Your choice was deleted<br><a href="index.html">&nbsp;Go home &nbsp;<i class="fa fa-fw fa-home" aria-hidden="true"></a>';
    document.getElementById ('mSuccessStud').hidden = true;
    document.getElementById ('mErrorStud').hidden = true;
  }
}
