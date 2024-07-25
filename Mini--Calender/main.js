const date = document.querySelector("[data-date]");
const day = document.querySelector("[data-day]");
const month = document.querySelector("[data-month]");
const year = document.querySelector("[data-year]");


const today = new Date();
console.log(today);


// defining days and months
const allWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// getting date--

date.innerHTML = today.getDate();
day.innerText = allWeekDays[today.getDay()];//will give day in number -- sunday = 0
month.innerText = allMonths[today.getMonth()];//will give month in number-- jan = 0
year.innerText = today.getFullYear();