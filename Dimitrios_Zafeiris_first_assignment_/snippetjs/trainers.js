let trainers = [];
// define the form trainStart inputs
let trainFname = document.getElementById ('trainFname');
let trainLname = document.getElementById ('trainLname');
let trainEmail = document.getElementById ('trainEmail');
let trainPass = document.getElementById ('trainPass');
let trainStart = document.getElementById ('trainStart');
let trainEnd = document.getElementById ('trainEnd');
let trainPhone = document.getElementById ('trainPhone');

let btnSubmit = document.getElementById ('submitTrain');
btnSubmit.addEventListener ('click', submit);

let btnReset = document.getElementById ('resetTrain');
btnReset.addEventListener ('click', reset);

let btnUpdate = document.getElementById ('updateTrain');
btnUpdate.addEventListener ('click', update);

// let btnDelete = document.getElementById ('delete');
// btnDelete.addEventListener ('click', deleteTrainer);

let divTrainers = document.getElementById ('trainers');

// functional constructor - This means that we use this function in order to create objects
// of type trainer
function Trainer (
  Fname,
  Lname,
  Email,
  trainPass,
  trainStart,
  trainEnd,
  endTime,
  file
) {
  this.Fname = Fname;
  this.Lname = Lname;
  this.Email = Email;
  this.trainPass = trainPass;
  this.trainStart = trainStart;
  this.trainEnd = trainEnd;
  this.endTime = endTime;
  this.file = file;
}

function trainerToString (trainer) {
  return `${trainer.Fname} ${trainer.Lname} ${trainer.Email} ${trainer.trainPass} ${trainer.trainStart} ${trainer.trainEnd} ${trainer.endTime}`;
  // return(trainer.name + " " + trainer.price + " " + trainer.speed);
}
function trainerToRow (trainer) {
  return `<td>${trainer.Fname}</td><td>${trainer.Lname}</td><td>${trainer.Email}</td><td>${trainer.trainPass}</td><td>${trainer.trainStart}<td>${trainer.trainEnd}</td><td>${trainer.endTime}</td>`;
  // return(trainer.name + " " + trainer.price + " " + trainer.speed);
}

function submit (event) {
  event.preventDefault (); // stops from refreshing
  const form = document.getElementById ('formAddTrain');
  if (form.checkValidity ()) {
    document.getElementById ('mSuccessTrain').innerHTML =
      '<i class="fa-solid fa-square-check"></i>&nbsp;Form is valid';

    let myTrainer = new Trainer (
      trainFname.value,
      trainLname.value,
      trainEmail.value,
      trainPass.value,
      trainStart.value,
      trainEnd.value,
      trainPhone.value
    );
    trainers.push (myTrainer);
    // create an HTML Element
    // create an Edit button
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.trainerIndex = trainers.length - 1;
    btnEdit.addEventListener ('click', edit);
    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.trainerIndex = trainers.length - 1;
    btnDelete.addEventListener ('click', deleteTrainer);
    // somehow relate (bind) the button to an element of the array
    // append this HTML Element to document body
    createParagraphElement (myTrainer, btnEdit, btnDelete);

    btnReset.click ();
    console.log (trainers);
  } else {
    document.getElementById ('mSuccessTrain').hidden = true;
    document.getElementById ('mErrorTrain').innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Something wrong happen, refreshing your page<br/>';
  }
}

function reset (event) {
  console.log ('Form is reset');
  btnSubmit.textContent = 'Add';
}

function edit (event) {
  trainFname.value = trainers[this.trainerIndex].Fname;
  trainLname.value = trainers[this.trainerIndex].Lname;
  trainEmail.value = trainers[this.trainerIndex].Email;
  trainPass.value = trainers[this.trainerIndex].trainPass;
  trainStart.value = trainers[this.trainerIndex].trainStart;
  trainEnd.value = trainers[this.trainerIndex].trainEnd;
  trainPhone.value = trainers[this.trainerIndex].endTime;

  btnSubmit.hidden = true;
  btnUpdate.hidden = false;
  btnUpdate.trainerIndex = this.trainerIndex;
  // btnUpdate.trainer = new trainer(trainFname.value, etc);
  console.log (trainerToString (trainers[this.trainerIndex]));
}

function update (event) {
  event.preventDefault ();
  console.log (this.trainerIndex);
  console.log (
    trainerToString (
      new Trainer (
        trainFname.value,
        trainLname.value,
        trainEmail.value,
        trainPass.value,
        trainStart.value,
        trainEnd.value,
        trainPhone.value
      )
    )
  );
  trainers[this.trainerIndex] = new Trainer (
    trainFname.value,
    trainLname.value,
    trainEmail.value,
    trainPass.value,
    trainStart.value,
    trainEnd.value,
    trainPhone.value
  );
  divTrainers.innerHTML = '';
  for (let i = 0; i < trainers.length; i++) {
    let btnEdit = document.createElement ('button');
    btnEdit.textContent = 'Edit';
    btnEdit.trainerIndex = i;
    btnEdit.addEventListener ('click', edit);

    let btnDelete = document.createElement ('button');
    btnDelete.textContent = 'Delete';
    btnDelete.trainerIndex = i;
    btnDelete.addEventListener ('click', deleteTrainer);

    createParagraphElement (trainers[i], btnEdit, btnDelete);
  }
  btnUpdate.hidden = true;
  btnSubmit.hidden = false;
  btnReset.click ();
}

function createParagraphElement (trainer, editButton, deleteButton) {
  createRowElement (trainer, editButton, deleteButton);
}
function createRowElement (trainer, editButton, deleteButton) {
  let tbody = document.getElementById ('trainers');
  let row = document.createElement ('tr');
  row.id = 'trainer' + trainers.indexOf (trainer);
  //bind trainer ID to RowElement
  row.innerHTML = trainerToRow (trainer);
  tbody.appendChild (row);
  let table = document.getElementById ('tableTrainers');
  table.hidden = false;
  row.appendChild (editButton);
  row.appendChild (deleteButton);
}
function deleteTrainer () {
  //remove the trainer from the trainers list
  trainers.splice (this.trainerIndex, 1);
  //remove from tableTrainers
  let tbody = document.getElementById ('trainers');
  let row = document.getElementById (`trainer${this.trainerIndex}`);
  tbody.removeChild (row);
  //check if trainers.length == 0 kai an einai tote hide ton table header
  if (trainers.length == 0) {
    let table = document.getElementById ('tableTrainers');
    document.getElementById ('mSuccessAss').hidden = true;
    table.hidden = true;
    document.getElementById ('mDelTrain').innerHTML =
      '<i class="fa-solid fa-trash-can"></i></i>&nbsp;&nbsp;<span>Your choice was deleted<br><a href="index.html"><i class="fa fa-fw fa-home" aria-hidden="true"></a></span>';
  }
}
