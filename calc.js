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
  year: currentDate.getFullYear(),
  month: currentDate.getMonth(),
  day: currentDate.getDate(),
};

let events = [];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function updateMonthTitle() {
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  monthTitle.textContent = `${month} ${year}`;
}
function renderCalendar() {
  updateMonthTitle();
}
renderCalendar();

// developing the month grid function
function renderCalendarGrid() {
  calendarGrid.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const leadingEmptyCells = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < leadingEmptyCells; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day-cell", "empty");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day-cell");
    dayCell.textContent = day;
    calendarGrid.appendChild(dayCell);
  }
}

function renderCalendar() {
  updateMonthTitle();
  renderCalendarGrid();
}
renderCalendar();

prevMonthBtn.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

todayBtn.addEventListener("click", function () {
  currentDate = new Date();
  selectedDate = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };
  renderCalendar();
  renderEvents();
});


// selecting date fault
function isSameDate(year, month, day, dateObject) {
  return (
    year === dateObject.getFullYear() &&
    month === dateObject.getMonth() &&
    day === dateObject.getDate()
  );
}
if (
  year === selectedDate.year &&
  month === selectedDate.month &&
  day === selectedDate.day
) {
  dayCell.classList.add("selected");
}
const today = new Date();
if (isSameDate(year, month, day, today)) {
  dayCell.classList.add("today");
}

