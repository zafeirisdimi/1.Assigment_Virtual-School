"use strict";

var students = []; // define the form field inputs

var studFname = document.getElementById('StudFname');
var studLname = document.getElementById('StudLname');
var studEmail = document.getElementById('StudEmail');
var studPass = document.getElementById('StudPass');
var studStart = document.getElementById('StudStart');
var studEnd = document.getElementById('StudEnd');
var studPhone = document.getElementById('StudPhone');
var btnSubmit = document.getElementById('submitFormStud');
btnSubmit.addEventListener('click', submit);
var btnReset = document.getElementById('resetFormStud');
btnReset.addEventListener('click', reset);
var btnUpdate = document.getElementById('updateFormStud');
btnUpdate.addEventListener('click', update); // let btnDelete = document.getElementById ('delete');
// btnDelete.addEventListener ('click', deleteStudent);

var divStudents = document.getElementById('students'); // functional constructor - This means that we use this function in order to create objects
// of type Student

function Student(fname, lname, email, pass, start, end, phone) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.pass = pass;
  this.start = start;
  this.end = end;
  this.phone = phone;
}

function StudentToString(student) {
  return "".concat(student.fname, " ").concat(student.lname, " ").concat(student.email, " ").concat(student.pass, " ").concat(student.start, " ").concat(student.end, " ").concat(student.phone); // return(Student.name + " " + Student.price + " " + Student.speed);
}

function StudentToToRow(student) {
  return "<td>".concat(student.fname, "</td><td>").concat(student.lname, "</td><td>").concat(student.email, "</td><td>").concat(student.pass, "</td><td>").concat(student.start, "<td>").concat(student.end, "</td><td>").concat(student.phone, "</td>"); // return(Student.name + " " + Student.price + " " + Student.speed);
}

function submit(event) {
  event.preventDefault(); // stops from refreshing

  var form = document.getElementById('formAddStud');

  if (form.checkValidity()) {
    document.getElementById('mSuccessStud').innerHTML = '<i class="fa-solid fa-square-check"></i>&nbsp;Form is valid';
    document.getElementById('mErrorStud').hidden = false;
    var myStudent = new Student(studFname.value, studLname.value, studEmail.value, studPass.value, studStart.value, studEnd.value, studPhone.value);
    students.push(myStudent); // create an HTML Element
    // create an Edit button

    var btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.studentIndex = students.length - 1;
    btnEdit.addEventListener('click', edit);
    var btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.studentIndex = students.length - 1;
    btnDelete.addEventListener('click', deleteStudent); // somehow relate (bind) the button to an element of the array
    // append this HTML Element to document body

    createParagraphElement(myStudent, btnEdit, btnDelete);
    btnReset.click();
    console.log(students);
  } else {
    document.getElementById('mSuccessStud').hidden = true;
    document.getElementById('mErrorStud').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Something wrong happen, <br>refreshing your page';
  }
}

function reset(event) {
  console.log('Form is reset');
  btnSubmit.textContent = 'Add';
}

function edit(event) {
  studFname.value = students[this.studentIndex].fname;
  studLname.value = students[this.studentIndex].lname;
  studEmail.value = students[this.studentIndex].email;
  studPass.value = students[this.studentIndex].pass;
  studStart.value = students[this.studentIndex].start;
  studEnd.value = students[this.studentIndex].end;
  studPhone.value = students[this.studentIndex].phone;
  btnUpdate.hidden = true;
  btnSubmit.hidden = false;
  btnUpdate.studentIndex = this.studentIndex; // btnUpdate.Student = new Student(lessonDescription.value, etc);

  console.log(StudentToString(students[this.studentIndex]));
}

function update(event) {
  event.preventDefault();
  console.log(this.studentIndex);
  console.log(studentToString(new Student(studFname.value, studLname.value, studEmail.value, studPass.value, studStart.value, studEnd.value, studPhone.value)));
  students[this.studentIndex] = new Student(studFname.value, studLname.value, studEmail.value, studPass.value, studStart.value, studEnd.value, studPhone.value);
  divStudents.innerHTML = '';

  for (var i = 0; i < students.length; i++) {
    var btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.studentIndex = i;
    btnEdit.addEventListener('click', edit);
    var btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.studentIndex = i;
    btnDelete.addEventListener('click', deleteStudent);
    createParagraphElement(students[i], btnEdit, btnDelete);
  }

  btnUpdate.hidden = false;
  btnSubmit.hidden = true;
  btnReset.click();
  document.getElementById('mSuccessStud').innerHTML = '<i class="fa-regular fa-face-smile"></i>&nbsp;You have updated the assignment successfully';
}

function createParagraphElement(student, editButton, deleteButton) {
  createRowElement(student, editButton, deleteButton);
}

function createRowElement(student, editButton, deleteButton) {
  var tbody = document.getElementById('students');
  var row = document.createElement('tr');
  row.id = 'student' + students.indexOf(student); //bind Student ID to RowElement

  row.innerHTML = StudentToToRow(student);
  tbody.appendChild(row);
  var table = document.getElementById('tableStudents');
  table.hidden = false;
  row.appendChild(editButton);
  row.appendChild(deleteButton);
}

function deleteStudent() {
  //remove the Student from the students list
  students.splice(this.studentIndex, 1); //remove from tableStudents

  var tbody = document.getElementById('students');
  var row = document.getElementById("student".concat(this.studentIndex));
  tbody.removeChild(row); //check if students.length == 0 kai an tote hide ton table header

  if (students.length == 0) {
    var table = document.getElementById('tableStudents');
    table.hidden = true;
    document.getElementById('mDelStud').innerHTML = '<i class="fa-solid fa-trash-can"></i></i>&nbsp;&nbsp;Your choice was deleted<br><a href="index.html">&nbsp;Go home &nbsp;<i class="fa fa-fw fa-home" aria-hidden="true"></a>';
    document.getElementById('mSuccessStud').hidden = true;
    document.getElementById('mErrorStud').hidden = true;
  }
}