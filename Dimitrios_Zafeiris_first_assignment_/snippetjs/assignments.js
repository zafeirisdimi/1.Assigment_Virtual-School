let assignments = [];
// define the form field inputs
let assignDescription = document.getElementById ('assignDescription');
let assignTitle = document.getElementById ('assignTitle');
let Field_Assign = document.getElementById ('Field_Assign');
let assignStartTime = document.getElementById ('assignStartTime');
let assignEndTime = document.getElementById ('assignEndTime');
let assignFile = document.getElementById ('assignFile');

let btnSubmit = document.getElementById ('submitFormAss');
btnSubmit.addEventListener ('click', submit);

let btnReset = document.getElementById ('resetFormAss');
btnReset.addEventListener ('click', reset);

let btnUpdate = document.getElementById ('updateFormAss');
btnUpdate.addEventListener ('click', update);

// let btnDelete = document.getElementById ('delete');
// btnDelete.addEventListener ('click', deleteCourse);

let divAssignments = document.getElementById ('assignments');

// functional constructor - This means that we use this function in order to create objects
// of type assignment
function Assignment (description, title, field, startTime, endTime, file) {
  this.description = description;
  this.title = title;
  this.field = field;
  this.startTime = startTime;
  this.endTime = endTime;
  this.file = file;
}

function courseToString (assignment) {
  return `${assignment.description} ${assignment.title} ${assignment.field} ${assignment.startTime} ${assignment.endTime} ${assignment.file}`;
  // return(assignment.name + " " + assignment.price + " " + assignment.speed);
}
function courseToToRow (assignment) {
  return `<td>${assignment.description}</td><td>${assignment.title}</td><td>${assignment.field}</td><td>${assignment.startTime}</td><td>${assignment.endTime}<td>${assignment.file}</td>`;
  // return(assignment.name + " " + assignment.price + " " + assignment.speed);
}

function submit (event) {
  event.preventDefault (); // stops from refreshing
  const form = document.getElementById ('formAddAss');
  if (form.checkValidity ()) {
    document.getElementById ('mSuccessAss').innerHTML =
      '<i class="fa-solid fa-square-check"></i>&nbsp;Form is valid';
    // create a new assignment object-----------------------------
    let myAssignment = new Assignment (
      assignDescription.value,
      assignTitle.value,
      Field_Assign.value,
      assignStartTime.value,
      assignEndTime.value,
      assignFile.value
    );
    assignments.push (myAssignment);
    // create an HTML Element
    // create an Edit button
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.assignmentIndex = assignments.length - 1;

    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.assignmentIndex = assignments.length - 1;
    btnDelete.addEventListener ('click', deleteCourse);
    // somehow relate (bind) the button to an element of the array
    // append this HTML Element to document body
    createParagraphElement (myAssignment, btnEdit, btnDelete);
    btnReset.click ();
    console.log (assignments);
  } else {
    document.getElementById ('mSuccessAss').hidden = true;
    document.getElementById ('mErrorAss').innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Something wrong happen, refreshing your page<br/>';
  }
}

function reset (event) {
  btnSubmit.textContent = 'Add';
}

function edit (event) {
  assignDescription.value = assignments[this.assignmentIndex].description;
  assignTitle.value = assignments[this.assignmentIndex].title;
  Field_Assign.value = assignments[this.assignmentIndex].field;
  assignStartTime.value = assignments[this.assignmentIndex].startTime;
  assignEndTime.value = assignments[this.assignmentIndex].endTime;
  assignFile.value = assignments[this.assignmentIndex].file;

  btnUpdate.hidden = false;

  btnUpdate.assignmentIndex = this.assignmentIndex;
  btnSubmit.hidden = true;
  // btnUpdate.assignment = new assignment(assignDescription.value, etc);
  console.log (courseToString (assignments[this.assignmentIndex]));
}

function update (event) {
  event.preventDefault ();
  console.log (this.assignmentIndex);
  console.log (
    courseToString (
      new Assignment (
        assignDescription.value,
        assignTitle.value,
        Field_Assign.value,
        assignStartTime.value,
        assignEndTime.value,
        assignFile.value
      )
    )
  );
  assignments[this.assignmentIndex] = new Assignment (
    assignDescription.value,
    assignTitle.value,
    Field_Assign.value,
    assignStartTime.value,
    assignEndTime.value,
    assignFile.value
  );
  divAssignments.innerHTML = '';
  for (let i = 0; i < assignments.length; i++) {
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    // btn.Edit.class;
    btnEdit.assignmentIndex = i;
    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.assignmentIndex = i;
    btnDelete.addEventListener ('click', deleteCourse);

    createParagraphElement (assignments[i], btnEdit, btnDelete);
  }
  btnUpdate.hidden = false;
  btnSubmit.hidden = true;

  btnReset.click ();
  document.getElementById ('mSuccessAss').innerHTML =
    '<i class="fa-regular fa-face-smile"></i>&nbsp;You have updated the assignment successfully';
}

function createParagraphElement (assignment, editButton, deleteButton) {
  createRowElement (assignment, editButton, deleteButton);
}

function createRowElement (assignment, editButton, deleteButton) {
  let tbody = document.getElementById ('assignments');
  let row = document.createElement ('tr');
  row.id = 'assignment' + assignments.indexOf (assignment);
  //bind assignment ID to RowElement
  row.innerHTML = courseToToRow (assignment);
  tbody.appendChild (row);
  let table = document.getElementById ('tableAssignments');
  table.hidden = false;
  row.appendChild (editButton);
  row.appendChild (deleteButton);
}
function deleteCourse () {
  //remove the assignment from the assignments list
  assignments.splice (this.assignmentIndex, 1);
  //remove from tableAssignments
  let tbody = document.getElementById ('assignments');
  let row = document.getElementById (`assignment${this.assignmentIndex}`);
  tbody.removeChild (row);

  //check if assignments.length == 0 kai an einai tote hide ton table header
  if (assignments.length == 0) {
    let table = document.getElementById ('tableAssignments');
    table.hidden = true;
    document.getElementById ('mDelAss').innerHTML =
      '<i class="fa-solid fa-trash-can"></i></i>&nbsp;&nbsp;<span>Your choice was deleted<br><a href="index.html"><i class="fa fa-fw fa-home" aria-hidden="true"></a></span>';
    document.getElementById ('mSuccessAss').hidden = true;
  }
}
