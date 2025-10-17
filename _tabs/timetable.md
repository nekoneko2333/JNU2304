---
layout: page
title: 🗓️ 课程表
permalink: /timetable/
---

{% assign timetable = site.data.timetable.weektype.single %}
{% assign weekdays = "monday:星期一,tuesday:星期二,wednesday:星期三,thursday:星期四,friday:星期五" | split: "," %}
{% assign timeslots = "上午第1节,上午第2节,上午第3节,下午第1节,下午第2节,下午第3节,下午第4节" | split: "," %}

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f5f5f5;
  }
  td {
    min-width: 100px;
  }
</style>

### 📅 单周课程表

<table>
  <thead>
    <tr>
      <th>时间 / 星期</th>
      {% for w in weekdays %}
        <th>{{ w | split: ":" | last }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
  {% for time in timeslots %}
    <tr>
      <td>{{ time }}</td>
      {% for w in weekdays %}
        {% assign day = w | split: ":" | first %}
        {% assign courses = timetable[day] %}
        {% if time contains "上午" %}
          {% assign slot_index = time | remove: "上午第" | remove: "节" | minus: 1 %}
          {% assign course = courses.morning[slot_index] %}
        {% else %}
          {% assign slot_index = time | remove: "下午第" | remove: "节" | minus: 1 %}
          {% assign course = courses.afternoon[slot_index] %}
        {% endif %}
        {% if course %}
          <td>{{ course.name }}<br><small>{{ course.location }}</small></td>
        {% else %}
          <td>-</td>
        {% endif %}
      {% endfor %}
    </tr>
  {% endfor %}
  </tbody>
</table>
