---
title: 📘 课程信息
icon: book
order: 4
---

欢迎来到课程专区！以下是所有课程的详情页面 👇

{% assign course_pages = site.pages | where_exp: "p", "p.path contains 'pages/courses/'" %}
<ul>
  {% for page in course_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
