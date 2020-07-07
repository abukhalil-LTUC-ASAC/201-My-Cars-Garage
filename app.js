"use strict";

var submitForm = document.getElementById('cars');
submitForm.addEventListener('submit', handleSubmit);

var carModel = '';
var yearModel = '';
var price = 0;
var totalPrice = 0;
var manufacturer = '';
var allCars = JSON.parse(localStorage.getItem('cars')) || [];

var table = document.getElementById('table');
var tbody = document.getElementById('tbody');
tbody.addEventListener('click', deleteRow);

var totalDiv = document.getElementById('total');

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);

  carModel = event.target[0].value;     // get data from form
  yearModel = event.target[1].value;
  manufacturer = event.target[2].value;
  price = estimateCost();
  saveToStorage();
  printInfo();
}

function saveToStorage() {
  allCars.push([carModel, yearModel, price, manufacturer])
  localStorage.setItem('cars', JSON.stringify(allCars))
}

function clearTableBody() {
  tbody.innerHTML = ''
}

function printInfo() {
  clearTableBody();

  for (var i = 0; i < allCars.length; i++) {
    var tr = document.createElement('tr');

    for (var j = 0; j < 4; j++) {
      var td = document.createElement('td');
      td.innerHTML = allCars[i][j];
      tr.appendChild(td);

      if (j == 3) {                   // adds delete column
        var td = document.createElement('td');
        td.innerHTML = 'X';
        td.setAttribute('id', i);
        tr.appendChild(td);

      }
    }
    tbody.appendChild(tr);
  }

  getTotal();
  totalDiv.innerHTML = 'Total Fortune = ' + totalPrice;

}

function getTotal() {
  totalPrice = 0;
  for (var i = 0; i < allCars.length; i++) {
    totalPrice += allCars[i][2];
  }
}

function estimateCost() {
  return Math.floor((Math.random()*(100000 - 7000) + 7000))
}

function deleteRow(event) {
  if(allCars[event.target.id]) {
    allCars.splice(event.target.id, 1);
    allCars.pop();                    // pops empty array
    saveToStorage();
    printInfo();
  }
}
printInfo();