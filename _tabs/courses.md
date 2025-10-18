---
title: 📘 课程信息
layout: page
icon: book
order: 3
toc: true
---

以下是所有课程的详情页面 👇 主要是考核方式汇总

需要查看每门课平时的作业，请转到“标签”，根据课程标签筛选

{% assign course_pages = site.pages | where_exp: "p", "p.path contains 'pages/courses/'" %}
<ul>
  {% for page in course_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
