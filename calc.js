// const currentDate = new Date();

// console.log(currentDate.getFullYear());
// console.log(currentDate.getMonth());
// console.log(currentDate.getDate());
// console.log(currentDate.getDay());

// const date = new Date(2026,9,4);
// console.log(date.getFullYear());
// console.log(date.getMonth());
// console.log(date.getDate());

// // no of days in the month 
// const daysInMonth = new Date(2026,10,0).getDate();
// console.log(daysInMonth);

const monthTitle = document.querySelector("#monthTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const prevMonthBtn = document.querySelector("#prevMonth");
const nextMonthBtn = document.querySelector("#nextMonth");
const todayBtn = document.querySelector("#todayBtn");
const eventForm = document.querySelector("#eventForm");
const eventTitle = document.querySelector("#eventTitle");
const eventTime = document.querySelector("#eventTime");
const eventList = document.querySelector("#eventList");
const selectedDateTitle = document.querySelector("#selectedDateTitle");


let currentDate = new Date();

let selectedDate = {
    year:currentDate.getFullYear(),
    month:currentDate.getMonth(),
    day:currentDate.getDate()
};

let events =[];

