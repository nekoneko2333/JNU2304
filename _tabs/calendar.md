---
title: 📅 日历
order: 3
---

<style>
.calendar-container { 
  max-width: 1000px; 
  margin: auto; 
  overflow-x: auto; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
}

.calendar-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a1a1a;
  flex: 1;
  text-align: center;
  letter-spacing: -0.02em;
}

.calendar-header .nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.calendar-header button { 
  padding: 0.625rem 1.25rem; 
  cursor: pointer; 
  border: none; 
  background-color: #f5f5f5; 
  border-radius: 8px; 
  transition: all 0.2s ease;
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
  min-height: 44px;
  touch-action: manipulation;
}

.calendar-header button:hover { 
  background-color: #e8e8e8; 
}

.calendar-header button:active {
  background-color: #ddd;
  transform: scale(0.98);
}

.calendar-header button#todayBtn {
  background-color: #1a1a1a;
  color: #fff;
}

.calendar-header button#todayBtn:hover {
  background-color: #333;
}

.event-stats {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.875rem;
  padding: 0.625rem;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.calendar-container table.calendar { 
  width: 100%; 
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed; 
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.calendar-container table th { 
  background-color: #1a1a1a;
  color: #fff;
  padding: 0.875rem 0.5rem;
  font-weight: 500;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}

.calendar-container table td { 
  border: 1px solid #f0f0f0; 
  padding: 0.5rem; 
  vertical-align: top; 
  height: 120px; 
  overflow: hidden;
  position: relative;
  transition: background-color 0.15s ease;
  background-color: #fff;
}

.calendar-container table td:not(.empty) {
  cursor: pointer;
}

.calendar-container table td:hover:not(.empty) {
  background-color: #fafafa;
}

.calendar-container table td:active:not(.empty) {
  background-color: #f0f0f0;
}

.calendar-container table td.empty {
  background-color: #fafafa;
  border-color: #f5f5f5;
}

.calendar-container table td.past {
  opacity: 0.5;
}

.calendar-container table td.today { 
  background-color: #1a1a1a !important; 
  color: #fff;
  font-weight: 500;
}

.calendar-container table td.today .day-number {
  color: #fff;
}

.calendar-container table td.has-events::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 6px;
  height: 6px;
  background-color: #1a1a1a;
  border-radius: 50%;
}

.calendar-container table td.today.has-events::before {
  background-color: #fff;
}

.day-number {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.375rem;
  color: #1a1a1a;
  line-height: 1.2;
}

.events-container { 
  display: flex; 
  flex-direction: column; 
  gap: 0.25rem;
  max-height: 85px; 
  overflow: hidden;
  margin-top: 0.25rem;
}

.event { 
  display: block; 
  font-size: 0.6875rem; 
  border-radius: 4px; 
  padding: 0.25rem 0.5rem; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.2s ease;
  font-weight: 400;
  line-height: 1.4;
}

.event:active {
  opacity: 0.7;
}

.event.homework { 
  background-color: #ff6b6b;
  color: #fff; 
}

.event.test { 
  background-color: #ffa726;
  color: #fff; 
}

.event.activity { 
  background-color: #66bb6a;
  color: #fff; 
}

.event-more {
  display: block;
  font-size: 0.625rem;
  color: #999;
  background-color: transparent;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-style: normal;
  cursor: pointer;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .calendar-container { 
    padding: 0.75rem;
  }
  
  .calendar-header {
    margin-bottom: 1rem;
  }
  
  .calendar-header h3 {
    font-size: 1.25rem;
    order: 1;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .calendar-header .nav-buttons {
    justify-content: space-between;
    width: 100%;
    order: 2;
  }
  
  .calendar-header button {
    flex: 1;
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
    min-height: 48px;
  }
  
  .calendar-container table th { 
    padding: 0.75rem 0.25rem;
    font-size: 0.75rem;
  }
  
  .calendar-container table td { 
    font-size: 0.75rem; 
    height: auto;
    min-height: 80px;
    padding: 0.5rem 0.25rem;
  }
  
  .day-number {
    font-size: 0.9375rem;
    margin-bottom: 0.25rem;
  }
  
  .event {
    font-size: 0.625rem;
    padding: 0.2rem 0.35rem;
    line-height: 1.3;
  }
  
  .events-container {
    max-height: 55px;
    gap: 0.2rem;
  }
  
  .calendar-container table td.has-events::before {
    width: 5px;
    height: 5px;
    top: 0.375rem;
    right: 0.375rem;
  }
}

@media (max-width: 480px) {
  .calendar-container { 
    padding: 0.5rem;
  }
  
  .calendar-header h3 {
    font-size: 1.125rem;
  }
  
  .calendar-header button {
    padding: 0.625rem 0.375rem;
    font-size: 0.8125rem;
    min-height: 44px;
  }
  
  .calendar-container table th { 
    padding: 0.625rem 0.125rem;
    font-size: 0.6875rem;
  }
  
  .calendar-container table td { 
    min-height: 70px;
    padding: 0.375rem 0.125rem;
  }
  
  .day-number {
    font-size: 0.875rem;
  }
  
  .events-container {
    max-height: 45px;
  }
  
  .event {
    font-size: 0.5625rem;
    padding: 0.15rem 0.3rem;
  }
  
  .event-more {
    font-size: 0.5625rem;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .calendar-container table th { 
    padding: 0.5rem 0.1rem;
    font-size: 0.625rem;
  }
  
  .calendar-container table td { 
    min-height: 65px;
    padding: 0.3rem 0.1rem;
  }
  
  .day-number {
    font-size: 0.8125rem;
  }
  
  .events-container {
    max-height: 40px;
  }
}

/* 日期详情模态框样式 */
.event-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

.event-modal.show {
  display: flex;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.event-modal-content {
  background-color: #fff;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  position: relative;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.event-modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
}

.event-modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.event-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  line-height: 1;
}

.event-modal-close:hover {
  background-color: #f5f5f5;
  color: #333;
}

.event-modal-body {
  padding: 1.5rem;
}

.event-modal-date {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.event-modal-events {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-modal-event {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  cursor: pointer;
}

.event-modal-event:hover {
  border-color: #ddd;
  background-color: #fafafa;
}

.event-modal-event.has-link {
  cursor: pointer;
}

.event-modal-event.has-link:hover {
  border-color: #1a1a1a;
  background-color: #f5f5f5;
}

.event-modal-event-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-modal-event.has-link .event-modal-event-title::after {
  content: "→";
  margin-left: auto;
  color: #999;
  font-size: 0.875rem;
}

.event-modal-event-type {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.event-modal-event-type.homework {
  background-color: #ff6b6b;
  color: #fff;
}

.event-modal-event-type.test {
  background-color: #ffa726;
  color: #fff;
}

.event-modal-event-type.activity {
  background-color: #66bb6a;
  color: #fff;
}

.event-modal-empty {
  text-align: center;
  padding: 2rem;
  color: #999;
}

/* 移动端模态框优化 */
@media (max-width: 768px) {
  .event-modal {
    padding: 0.5rem;
  }
  
  .event-modal-content {
    max-height: 90vh;
    border-radius: 12px;
  }
  
  .event-modal-header {
    padding: 1.25rem;
  }
  
  .event-modal-header h3 {
    font-size: 1.125rem;
  }
  
  .event-modal-body {
    padding: 1.25rem;
  }
  
  .event-modal-event {
    padding: 0.875rem;
  }
  
  .event-modal-event-title {
    font-size: 0.9375rem;
  }
}
</style>

<div class="calendar-container">
  <div class="calendar-header">
    <div class="nav-buttons">
      <button id="prevMonth">‹ 上月</button>
      <button id="todayBtn">今天</button>
      <button id="nextMonth">下月 ›</button>
    </div>
    <h3 id="monthTitle">2025年10月</h3>
  </div>
  <div id="eventStats" class="event-stats" style="display: none;"></div>
  <table class="calendar">
    <thead>
      <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
    </thead>
    <tbody id="calendarBody"></tbody>
  </table>
</div>

<!-- 日期详情模态框 -->
<div id="eventModal" class="event-modal">
  <div class="event-modal-content">
    <div class="event-modal-header">
      <h3 id="modalDateTitle">日期详情</h3>
      <button class="event-modal-close" id="modalCloseBtn">&times;</button>
    </div>
    <div class="event-modal-body">
      <div class="event-modal-date" id="modalDateText"></div>
      <div class="event-modal-events" id="modalEventsList"></div>
    </div>
  </div>
</div>

<!-- 合并 calendar.yml 和博客提醒日期数据，供 JS 读取 -->
<script id="calendarData" type="application/json">
{%- comment -%}
合并两个数据源：
1. _data/calendar.yml 中的手动添加的事件
2. 从博客 front matter 中提取的提醒日期
{%- endcomment -%}
{%- assign manual_events = site.data.calendar -%}
{%- assign post_events = site.data.calendar_from_posts -%}
{%- if manual_events and post_events -%}
  {%- assign all_events = manual_events | concat: post_events -%}
  {{ all_events | jsonify }}
{%- elsif manual_events -%}
  {{ manual_events | jsonify }}
{%- elsif post_events -%}
  {{ post_events | jsonify }}
{%- else -%}
  []
{%- endif -%}
</script>

<!-- 引入 JS -->
<script src="{{ '/assets/js/calendar.js' | relative_url }}"></script>
