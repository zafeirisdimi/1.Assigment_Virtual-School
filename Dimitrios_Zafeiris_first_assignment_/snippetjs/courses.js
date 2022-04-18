let courses = [];
// define the form field inputs
let lessonDescription = document.getElementById ('lessonDescription');
let lessonTitle = document.getElementById ('lessonTitle');
let lessonNumber = document.getElementById ('lessonNumber');
let idStud = document.getElementById ('idStud');
let cField = document.getElementById ('cField');
let cStartTime = document.getElementById ('cStartTime');
let cEndTime = document.getElementById ('cEndTime');

let btnSubmit = document.getElementById ('submit');
btnSubmit.addEventListener ('click', submit);

let btnReset = document.getElementById ('reset');
btnReset.addEventListener ('click', reset);

let btnUpdate = document.getElementById ('update');
btnUpdate.addEventListener ('click', update);

let btnDelete = document.getElementById ('delete');
btnDelete.addEventListener ('click', deleteCourse);

let divCourses = document.getElementById ('courses');

// functional constructor - This means that we use this function in order to create objects
// of type course
function Course (
  description,
  title,
  number,
  idStud,
  field,
  startTime,
  endTime
) {
  this.description = description;
  this.title = title;
  this.number = number;
  this.idStud = idStud;
  this.field = field;
  this.startTime = startTime;
  this.endTime = endTime;
}

function courseToString (course) {
  return `${course.description} ${course.title} ${course.number} ${course.idStud} ${course.field} ${course.startTime} ${course.endTime}`;
  // return(course.name + " " + course.price + " " + course.speed);
}
function courseToToRow (course) {
  return `<td>${course.description}</td><td>${course.title}</td><td>${course.number}</td><td>${course.idStud}</td><td>${course.field}<td>${course.startTime}</td><td>${course.endTime}</td>`;
  // return(course.name + " " + course.price + " " + course.speed);
}

function submit (event) {
  event.preventDefault (); // stops from refreshing

  const form = document.getElementById ('formAddCourse');
  if (form.checkValidity ()) {
    document.getElementById ('mSuccess').innerHTML =
      '<i class="fa-solid fa-square-check"></i>&nbsp;Form is valid';
    console.log (form.checkValidity ());

    // create a new course object-----------------------------
    let myCourse = new Course (
      lessonDescription.value,
      lessonTitle.value,
      lessonNumber.value,
      idStud.value,
      cField.value,
      cStartTime.value,
      cEndTime.value
    );
    courses.push (myCourse);
    // create an HTML Element
    // create an Edit button
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.courseIndex = courses.length - 1;

    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.courseIndex = courses.length - 1;
    btnDelete.addEventListener ('click', deleteCourse);
    // somehow relate (bind) the button to an element of the array
    // append this HTML Element to document body
    createParagraphElement (myCourse, btnEdit, btnDelete);

    btnReset.click ();
    console.log (courses);
  } else {
    document.getElementById ('mError').innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Something wrong happen, refreshing your page<br/>';
  }
}

function reset (event) {
  btnSubmit.textContent = 'Add';
}

function edit (event) {
  lessonDescription.value = courses[this.courseIndex].description;
  lessonTitle.value = courses[this.courseIndex].title;
  lessonNumber.value = courses[this.courseIndex].number;
  idStud.value = courses[this.courseIndex].idStud;
  cField.value = courses[this.courseIndex].field;
  cStartTime.value = courses[this.courseIndex].startTime;
  cEndTime.value = courses[this.courseIndex].endTime;

  btnUpdate.hidden = false;
  btnSubmit.hidden = true;
  btnUpdate.courseIndex = this.courseIndex;

  // btnUpdate.course = new course(lessonDescription.value, etc);
  console.log (courseToString (courses[this.courseIndex]));
}

function update (event) {
  event.preventDefault ();
  console.log (this.courseIndex);
  console.log (
    courseToString (
      new Course (
        lessonDescription.value,
        lessonTitle.value,
        lessonNumber.value,
        idStud.value,
        cField.value,
        cStartTime.value,
        cEndTime.value
      )
    )
  );
  courses[this.courseIndex] = new Course (
    lessonDescription.value,
    lessonTitle.value,
    lessonNumber.value,
    idStud.value,
    cField.value,
    cStartTime.value,
    cEndTime.value
  );
  divCourses.innerHTML = '';
  for (let i = 0; i < courses.length; i++) {
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btn.Edit.class;
    btnEdit.courseIndex = i;
    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.courseIndex = i;
    btnDelete.addEventListener ('click', deleteCourse);

    createParagraphElement (courses[i], btnEdit, btnDelete);
  }
  btnUpdate.hidden = false;
  btnSubmit.hidden = true;
  btnReset.click ();
  document.getElementById ('mSuccess').innerHTML =
    '<i class="fa-regular fa-face-smile"></i>&nbsp;You have updated the assignment successfully';
}

function createParagraphElement (course, editButton, deleteButton) {
  // let table = document.getElementById ('courses');
  // table.appendChild (courseToToRow (course));
  // let paragraph = document.createElement ('p');
  // paragraph.innerText = courseToString (course);
  // let spanSpace = document.createElement ('span');
  // spanSpace.innerHTML = '&nbsp;';
  // paragraph.append (spanSpace, editButton);
  // divCourses.append (paragraph);
  createRowElement (course, editButton, deleteButton);
}

function createRowElement (course, editButton, deleteButton) {
  let tbody = document.getElementById ('courses');
  let row = document.createElement ('tr');
  row.id = 'course' + courses.indexOf (course);
  //bind course ID to RowElement
  row.innerHTML = courseToToRow (course);
  tbody.appendChild (row);
  let table = document.getElementById ('tableCourses');
  table.hidden = false;
  row.appendChild (editButton);
  row.appendChild (deleteButton);

  //table.appendChild (courseToToRow (course));
  // let paragraph = document.createElement ('p');
  // paragraph.innerText = courseToString (course);
  // let spanSpace = document.createElement ('span');
  // spanSpace.innerHTML = '&nbsp;';
  // paragraph.append (spanSpace, editButton);
  // divCourses.append (paragraph);
}
function deleteCourse () {
  //remove the course from the courses list
  courses.splice (this.courseIndex, 1);
  //remove from tableCourses
  let tbody = document.getElementById ('courses');
  let row = document.getElementById (`course${this.courseIndex}`);
  tbody.removeChild (row);
  //check if courses.length == 0 kai an einai tote hide ton table header
  if (courses.length == 0) {
    let table = document.getElementById ('tableCourses');
    table.hidden = true;
    document.getElementById ('mDel').innerHTML =
      '<i class="fa-solid fa-trash-can"></i></i>&nbsp;&nbsp;<span>Your choice was deleted<br><a href="index.html"><i class="fa fa-fw fa-home" aria-hidden="true"></a></span>';
    document.getElementById ('mSuccess').hidden = true;
  }

  //
}
