---
title: 📅 日历
permalink: /calendar/
order: 3
---

<style>
/* 这里保持你原来的 CSS */
.calendar-container { max-width: 900px; margin: auto; overflow-x: auto; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.calendar-header button { padding: 0.4rem 0.8rem; cursor: pointer; border: 1px solid #ccc; background-color: #f5f5f5; border-radius: 4px; transition: 0.2s; }
.calendar-header button:hover { background-color: #e0e0e0; }
.calendar-container table.calendar { width: 100%; border-collapse: collapse; table-layout: fixed; text-align: center; }
.calendar-container table th, .calendar-container table td { border: 1px solid #ddd; padding: 6px; vertical-align: top; height: 120px; overflow: hidden; }
.calendar-container table th { background-color: #f0f0f0; }
.today { background-color: #4fc3f7 !important; color: #fff; }
.events-container { display: flex; flex-direction: column; max-height: 90px; overflow: hidden; }
.event { display: block; font-size: 0.75rem; border-radius: 4px; padding: 2px 4px; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.event.homework { background-color: #f28b82; color: #fff; }
.event.test { background-color: #fbbc04; color: #fff; }
.event.activity { background-color: #34a853; color: #fff; }
@media (max-width: 768px) {
  .calendar-container { max-width: 100%; }
  .calendar-container table th, .calendar-container table td { font-size: 0.65rem; height: 80px; }
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
      <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
    </thead>
    <tbody id="calendarBody"></tbody>
  </table>
</div>

<!-- 把 calendar.yml 数据隐藏到页面里，供 JS 读取 -->
<script id="calendarData" type="application/json">
{{ site.data.calendar | jsonify }}
</script>

<!-- 引入 JS -->
<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
