---
title: 📘 课程信息
layout: page
icon: book
order: 3
toc: true
---

以下是所有课程的详情页面 👇 主要是考核方式汇总

需要查看每门课平时的作业，请转到“标签”，根据课程标签筛选

## 大三下（进行中）

{% assign junior2 = site.pages | where_exp: "p", "p.path contains 'pages/courses/junior-2/'" %}
<ul>
  {% for page in junior2 %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

## 大三上（已结课）

{% assign junior1 = site.pages | where_exp: "p", "p.path contains 'pages/courses/junior-1/'" %}
<ul>
  {% for page in junior1 %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

## 更早的课程

{% assign ended = site.pages | where: "title", "已经结束的课程" | first %}
<ul>
    <li><a href="{{ ended.url | relative_url }}">{{ ended.title }}</a></li>
</ul>
