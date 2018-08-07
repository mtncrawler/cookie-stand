'use strict';
console.log('js loaded');

//create function to generate pseudo random number between min and max hourly customers inclusive
function getRandomIntInclusive() {
  var min = Math.ceil(this.minHourlyCustomers);
  var max = Math.floor(this.maxHourlyCustomers);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create function based on average cookies per sale * random customers per hour to give estimated cookies sold for every hour 6am - 8pm
function estimatedCookiesPerHour() {
  for (var i = 0; i < 15; i++) {
    var averageCookies = this.avgCookiesPerSale;
    var cookiesSoldPerHour = Math.floor(averageCookies * this.customersPerHour());
    this.simulatedCookiesSold.push(cookiesSoldPerHour);
  }

  //add total cookies sold to end of array
  var cookiesTotal = this.simulatedCookiesSold.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  this.simulatedCookiesSold.push(cookiesTotal);

  return this.simulatedCookiesSold;
}

//create function to display location estimated cookie sales per hour as unordered list

function displayHourlyCookieSales() {
  this.projectedSales();
  var tbody = document.getElementById('main-content');
  var storeInfo = document.createElement('tr');
  var storeLocation = document.createElement('td');

  storeLocation.textContent = this.location;
  storeInfo.appendChild(storeLocation);
  tbody.appendChild(storeInfo);

  for(var i = 0; i < this.simulatedCookiesSold.length; i++) {
    var hourlySales = document.createElement('td');
    hourlySales.textContent = this.simulatedCookiesSold[i];
    storeInfo.appendChild(hourlySales);
  }
}

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

//constructor function to create store object; followed by methods added to object Store
var Store = function(location, simulatedCookiesSold, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerSale) {
  this.location = location;
  this.simulatedCookiesSold = simulatedCookiesSold;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
};
Store.prototype.customersPerHour = getRandomIntInclusive;
Store.prototype.projectedSales = estimatedCookiesPerHour;
Store.prototype.displayStats = displayHourlyCookieSales;

//create instances of Store for every location
var firstAndPike = new Store('1st and Pine', [], 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', [], 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', [], 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', [], 20, 38, 2.3);
var alki = new Store('Alki', [], 2, 16, 4.6);



function main() {
  firstAndPike.displayStats();
  seaTac.displayStats();
  seattleCenter.displayStats();
  capitolHill.displayStats();
  alki.displayStats();
}

main();

// //create object for the 1st and Pike location
// var firstAndPike = {
//   location: '1st and Pine',
//   simulatedCookiesSold: [],
//   minHourlyCustomers: 23,
//   maxHourlyCustomers: 65,
//   avgCookiesPerSale: 6.3,
//   customersPerHour: getRandomIntInclusive,
//   projectedSales: estimatedCookiesPerHour,
//   displayStats: displayHourlyCookieSales
// };



// //create object for the SeaTac location
// var seaTac = {
//   location: 'SeaTac Airport',
//   simulatedCookiesSold: [],
//   minHourlyCustomers: 3,
//   maxHourlyCustomers: 24,
//   avgCookiesPerSale: 1.2,
//   customersPerHour: getRandomIntInclusive,
//   projectedSales: estimatedCookiesPerHour,
//   displayStats: displayHourlyCookieSales
// };

// //create object for the Seattle Center location
// var seattleCenter = {
//   location: 'Seattle Center',
//   simulatedCookiesSold: [],
//   minHourlyCustomers: 11,
//   maxHourlyCustomers: 38,
//   avgCookiesPerSale: 3.7,
//   customersPerHour: getRandomIntInclusive,
//   projectedSales: estimatedCookiesPerHour,
//   displayStats: displayHourlyCookieSales
// };

// //create object for the Capitol Hill location
// var capitolHill = {
//   location: 'Capitol Hill',
//   simulatedCookiesSold: [],
//   minHourlyCustomers: 20,
//   maxHourlyCustomers: 38,
//   avgCookiesPerSale: 2.3,
//   customersPerHour: getRandomIntInclusive,
//   projectedSales: estimatedCookiesPerHour,
//   displayStats: displayHourlyCookieSales
// };

// //create object for the alki location
// var alki = {
//   location: 'Alki',
//   simulatedCookiesSold: [],
//   minHourlyCustomers: 2,
//   maxHourlyCustomers: 16,
//   avgCookiesPerSale: 4.6,
//   customersPerHour: getRandomIntInclusive,
//   projectedSales: estimatedCookiesPerHour,
//   displayStats: displayHourlyCookieSales
// };





