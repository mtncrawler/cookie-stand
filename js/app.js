'use strict';
console.log('js loaded');

//every hour every store is open for business
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Daily Location Total'];


//create function to generate pseudo random number between min and max hourly customers inclusive
function getRandomIntInclusive() {
  var min = Math.ceil(this.minHourlyCustomers);
  var max = Math.floor(this.maxHourlyCustomers);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create function based on average cookies per sale * random customers per hour to give estimated cookies sold for every hour 6am - 8pm
function estimatedCookiesPerHour() {
  for (var i = 0; i < 14; i++) {
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

//create function to display location estimated cookie sales per hour on table; each store on new row

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

//create function to sum hourly cookie sale totals of all stores and add them to the footer of table

function calcAndDisplayHourlyTotal() {
  var footer = document.getElementById('footer');
  var firstColumnFooter = document.createElement('td');
  firstColumnFooter.textContent = 'Total';
  footer.appendChild(firstColumnFooter);

  for(var i = 0; i < 15; i++) {
    var totalsFooter = document.createElement('td');
    totalsFooter.textContent = (firstAndPike.simulatedCookiesSold[i] + seaTac.simulatedCookiesSold[i] + seattleCenter.simulatedCookiesSold[i] + capitolHill.simulatedCookiesSold[i] + alki.simulatedCookiesSold[i]);
    footer.appendChild(totalsFooter);
  }
}

//create function to populate header of table with store hours array
function fillHeader() {
  var headerRow = document.getElementById('header-row');
  var emptyHeader = document.createElement('td');
  emptyHeader.textContent = '';
  headerRow.appendChild(emptyHeader);

  for (var i = 0; i < hours.length; i++) {
    var timeHeader = document.createElement('td');
    timeHeader.textContent = hours[i];
    headerRow.appendChild(timeHeader);
  }
}

//create second table to display number of Cookie Tossers needed at each store every hour - cookie tosser handles 20 customers/hour; minimum 2 cookie tossers
function fillHeader2() {
  var headerRow = document.getElementById('header-row2');
  var emptyHeader = document.createElement('td');
  emptyHeader.textContent = '';
  headerRow.appendChild(emptyHeader);

  for (var i = 0; i < hours.length-1; i++) {
    var timeHeader = document.createElement('td');
    timeHeader.textContent = hours[i];
    headerRow.appendChild(timeHeader);
  }
}

function calculateStaffRequirements() {
  var tbody = document.getElementById('main-content2');
  var storeInfo = document.createElement('tr');
  var storeLocation = document.createElement('td');

  storeLocation.textContent = this.location;
  storeInfo.appendChild(storeLocation);
  tbody.appendChild(storeInfo);

  for (var i = 0; i < this.simulatedCookiesSold.length-1; i++) {
    var staff = document.createElement('td');
    if (this.simulatedCookiesSold[i] < 40) {
      staff.textContent = 2;
    } else {
      staff.textContent = Math.ceil([(this.simulatedCookiesSold[i])/20]);
    }
    storeInfo.appendChild(staff);
    tbody.appendChild(storeInfo);
  }
}


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
Store.prototype.requiredStaff = calculateStaffRequirements;

//create instances of Store for every location
var firstAndPike = new Store('1st and Pine', [], 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', [], 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', [], 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', [], 20, 38, 2.3);
var alki = new Store('Alki', [], 2, 16, 4.6);

function main() {
  fillHeader();
  fillHeader2();
  firstAndPike.displayStats();
  seaTac.displayStats();
  seattleCenter.displayStats();
  capitolHill.displayStats();
  alki.displayStats();

  calcAndDisplayHourlyTotal();

  firstAndPike.requiredStaff();
  seaTac.requiredStaff();
  seattleCenter.requiredStaff();
  capitolHill.requiredStaff();
  alki.requiredStaff();
}

main();
