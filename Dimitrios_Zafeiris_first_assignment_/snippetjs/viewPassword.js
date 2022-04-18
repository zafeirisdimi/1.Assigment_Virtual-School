function myFunction () {
  var x = document.getElementById ('studPass');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
