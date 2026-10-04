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
const monthNames = [
 "January", "February", "March", "April",
 "May", "June", "July", "August",
 "September", "October", "November", "December"
];
let currentDate = new Date();
let selectedDate = {
 year: currentDate.getFullYear(),
 month: currentDate.getMonth(),
 day: currentDate.getDate()
};
let events = [];
function makeDateKey(year, month, day) {
 const monthNumber = String(month + 1).padStart(2, "0");
 const dayNumber = String(day).padStart(2, "0");
 return `${year}-${monthNumber}-${dayNumber}`;
}
function isSameDate(year, month, day, dateObject) {
 return (
 year === dateObject.getFullYear() &&
 month === dateObject.getMonth() &&
 day === dateObject.getDate()
 );
}
function updateMonthTitle() {
 const month = monthNames[currentDate.getMonth()];
 const year = currentDate.getFullYear();
 monthTitle.textContent = `${month} ${year}`;
}
function hasEventsOnDate(year, month, day) {
 const dateKey = makeDateKey(year, month, day);
 return events.some(function(event) {
 return event.date === dateKey;
 });
}
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
 const today = new Date();
 for (let day = 1; day <= daysInMonth; day++) {
 const dayCell = document.createElement("div");
 dayCell.classList.add("day-cell");
 dayCell.textContent = day;
 dayCell.dataset.year = year;
 dayCell.dataset.month = month;
 dayCell.dataset.day = day;
 if (
 year === selectedDate.year &&
 month === selectedDate.month &&
 day === selectedDate.day
 ) {
 dayCell.classList.add("selected");
 }
 if (isSameDate(year, month, day, today)) {
 dayCell.classList.add("today");
 }
 if (hasEventsOnDate(year, month, day)) {
 const dot = document.createElement("div");
 dot.classList.add("event-dot");
 dayCell.appendChild(dot);
 }
 dayCell.addEventListener("click", function() {
 selectedDate = {
 year: Number(dayCell.dataset.year),
 month: Number(dayCell.dataset.month),
 day: Number(dayCell.dataset.day)
 };
 renderCalendarGrid();
 renderEvents();
 });
 calendarGrid.appendChild(dayCell);
 }
}
function getEventsForSelectedDate() {
 const dateKey = makeDateKey(
 selectedDate.year,
 selectedDate.month,
 selectedDate.day
 );
 return events.filter(function(event) {
 return event.date === dateKey;
 });
}
function renderEvents() {
 eventList.innerHTML = "";
 selectedDateTitle.textContent =
 `${monthNames[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`;

 const selectedEvents = getEventsForSelectedDate();
 if (selectedEvents.length === 0) {
 const empty = document.createElement("p");
 empty.textContent = "No events for this date.";
 eventList.appendChild(empty);
 return;
 }
 selectedEvents.forEach(function(event) {
 const item = document.createElement("div");
 item.classList.add("event-item");
 const info = document.createElement("div");
 const title = document.createElement("strong");
 title.textContent = event.title;
 const time = document.createElement("small");
 time.textContent = event.time || "No time";
 info.appendChild(title);
 info.appendChild(time);
 const actions = document.createElement("div");
 const editBtn = document.createElement("button");
 editBtn.type = "button";
 editBtn.textContent = "Edit";
 const deleteBtn = document.createElement("button");
 deleteBtn.type = "button";
 deleteBtn.textContent = "Delete";
 editBtn.addEventListener("click", function() {
 editEvent(event.id);
 });
 deleteBtn.addEventListener("click", function() {
 deleteEvent(event.id);
 });
 actions.appendChild(editBtn);
 actions.appendChild(deleteBtn);
 item.appendChild(info);
 item.appendChild(actions);
 eventList.appendChild(item);
 });
}
function addEvent() {
 const title = eventTitle.value.trim();
 const time = eventTime.value;
 if (title === "") {
 return;
 }
 const newEvent = {
 id: Date.now(),
 title: title,
 date: makeDateKey(
 selectedDate.year,
 selectedDate.month,
 selectedDate.day
 ),

 time: time
 };
 events.push(newEvent);
 eventForm.reset();
 renderCalendarGrid();
 renderEvents();
}
function deleteEvent(eventId) {
 const index = events.findIndex(function(event) {
 return event.id === eventId;
 });
 if (index === -1) {
 return;
 }
 events.splice(index, 1);
 renderCalendarGrid();
 renderEvents();
}
function editEvent(eventId) {
 const event = events.find(function(item) {
 return item.id === eventId;
 });
 if (!event) {
 return;
 }
 const newTitle = prompt("Edit event:", event.title);
 if (newTitle === null) {
 return;
 }
 const cleanedTitle = newTitle.trim();
 if (cleanedTitle === "") {
 return;
 }
 event.title = cleanedTitle;
 renderCalendarGrid();
 renderEvents();
}
prevMonthBtn.addEventListener("click", function() {
 currentDate.setMonth(currentDate.getMonth() - 1);
 renderCalendar();
});
nextMonthBtn.addEventListener("click", function() {
 currentDate.setMonth(currentDate.getMonth() + 1);
 renderCalendar();
});
todayBtn.addEventListener("click", function() {
 currentDate = new Date();
 selectedDate = {
 year: currentDate.getFullYear(),
 month: currentDate.getMonth(),
 day: currentDate.getDate()
 };

 renderCalendar();
 renderEvents();
});
eventForm.addEventListener("submit", function(event) {
 event.preventDefault();
 addEvent();
});
function renderCalendar() {
 updateMonthTitle();
 renderCalendarGrid();
}
renderCalendar();
renderEvents()