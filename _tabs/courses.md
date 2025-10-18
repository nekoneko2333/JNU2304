---
title: 📘 课程信息
layout: page
icon: book
order: 3
toc: true
---

以下是所有课程的详情页面 👇

{% assign course_pages = site.pages | where_exp: "p", "p.path contains 'pages/courses/'" %}
<ul>
  {% for page in course_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
