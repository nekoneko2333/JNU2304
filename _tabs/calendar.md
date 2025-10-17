---
title: 📅 日历与作业
layout: page
permalink: /calendar/
---

<style>
.calendar-container {
  max-width: 800px;
  margin: auto;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.calendar-header button {
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
.calendar {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.calendar th, .calendar td {
  border: 1px solid #ddd;
  padding: 8px;
  vertical-align: top;
  height: 80px;
}
.calendar th {
  background-color: #f5f5f5;
}
.today {
  background-color: #ffeb3b;
}
.event {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  border-radius: 4px;
  padding: 2px 4px;
}
.event.homework { background-color: #f28b82; color: #fff; }
.event.test { background-color: #fbbc04; color: #fff; }
.event.activity { background-color: #34a853; color: #fff; }
</style>

<div class="calendar-container">
  <div class="calendar-header">
    <button id="prevMonth">&lt; 上月</button>
    <h3 id="monthTitle">2025年10月</h3>
    <button id="nextMonth">下月 &gt;</button>
  </div>
  <table class="calendar">
    <thead>
      <tr>
        <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
      </tr>
    </thead>
    <tbody id="calendarBody">
    </tbody>
  </table>
</div>

<script>
const calendarData = {{ site.data.calendar | jsonify }};
let year = 2025;
let month = 10;

function renderCalendar() {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDay = new Date(year, month, 0).getDate();
  const tbody = document.getElementById("calendarBody");
  tbody.innerHTML = "";
  let dayCounter = 1;
  
  for (let week = 0; week < 6; week++) {
    const tr = document.createElement("tr");
    for (let d = 0; d < 7; d++) {
      const td = document.createElement("td");
      if ((week === 0 && d < firstDay) || dayCounter > lastDay) {
        td.innerHTML = "";
      } else {
        const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(dayCounter).padStart(2,"0")}`;
        td.innerHTML = `<strong>${dayCounter}</strong>`;
        const events = calendarData.filter(e => e.date === dateStr);
        events.forEach(ev => {
          const span = document.createElement("span");
          span.className = "event " + (ev.type || "");
          span.textContent = ev.event;
          td.appendChild(span);
        });
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth()+1 === month && today.getDate() === dayCounter) {
          td.classList.add("today");
        }
        dayCounter++;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  document.getElementById("monthTitle").textContent = `${year}年${month}月`;
}

document.getElementById("prevMonth").addEventListener("click", ()=>{
  month--;
  if(month < 1){ month=12; year--; }
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", ()=>{
  month++;
  if(month > 12){ month=1; year++; }
  renderCalendar();
});

renderCalendar();
</script>
