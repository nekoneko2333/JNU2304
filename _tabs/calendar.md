---
title: 📅 日历
permalink: /calendar/
order: 3
---

<style>
/* 日历整体容器，限制宽度，避免撑开侧边栏 */
.calendar-container {
  max-width: 900px; /* 最大宽度 */
  margin: auto;
  overflow-x: auto; /* 内容过宽允许水平滚动 */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* 表头和导航按钮 */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.calendar-header button {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: 0.2s;
}
.calendar-header button:hover {
  background-color: #e0e0e0;
}

/* 表格样式 */
.calendar-container table.calendar {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 固定列宽，避免撑开 */
  text-align: center;
}
.calendar-container table th,
.calendar-container table td {
  border: 1px solid #ddd;
  padding: 6px;
  vertical-align: top;
  height: 120px; /* 固定高度 */
  overflow: hidden;
}
.calendar-container table th {
  background-color: #f0f0f0;
}

/* 今天高亮 */
.today {
  background-color: #4fc3f7 !important;
  color: #fff;
}

/* 多事件容器 */
.events-container {
  display: flex;
  flex-direction: column;
  max-height: 90px; /* 限制高度，多余事件隐藏 */
  overflow: hidden;
}

/* 单个事件样式 */
.event {
  display: block;
  font-size: 0.75rem;
  border-radius: 4px;
  padding: 2px 4px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.event.homework { background-color: #f28b82; color: #fff; }
.event.test { background-color: #fbbc04; color: #fff; }
.event.activity { background-color: #34a853; color: #fff; }

/* 响应式优化 */
@media (max-width: 768px) {
  .calendar-container {
    max-width: 100%;
  }
  .calendar-container table th,
  .calendar-container table td {
    font-size: 0.65rem;
    height: 80px;
  }
}
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
        if (events.length) {
          const container = document.createElement("div");
          container.className = "events-container";
          events.forEach(ev => {
            const span = document.createElement("span");
            span.className = "event " + (ev.type || "");
            span.title = ev.event; // 鼠标悬停显示完整内容
            span.textContent = ev.event;
            container.appendChild(span);
          });
          td.appendChild(container);
        }

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
