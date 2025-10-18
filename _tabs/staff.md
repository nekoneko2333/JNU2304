---
layout: page
title: 👥 班委与老师
order: 4
---

<style>
.staff-section {
  margin-top: 2rem;
}
.staff-section h3 {
  margin-bottom: 1rem;
  color: #0077b6;
  border-bottom: 2px solid #0077b6;
  display: inline-block;
  padding-bottom: 0.2rem;
}

/* 班委网格 */
.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.staff-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
}
.staff-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid #eee;
}
.staff-name {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.staff-role {
  font-size: 0.95rem;
  color: #0077b6;
  margin-bottom: 0.5rem;
}
.staff-info span {
  display: block;
  font-size: 0.85rem;
  color: #555;
  margin: 2px 0;
}

/* 老师列表 */
.staff-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}
.staff-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.staff-list li span {
  display: inline-block;
  margin-right: 1rem;
  color: #555;
}
</style>

<!-- 班委 -->
<div class="staff-section">
  <h3>班委</h3>
  <div class="staff-grid">
    {% for person in site.data.staff %}
      {% if person.type == "student" %}
      <div class="staff-card">
        {% if person.avatar %}<img class="staff-avatar" src="{{ person.avatar }}" alt="{{ person.name }}">{% endif %}
        <div class="staff-name">{{ person.name }}</div>
        {% if person.role %}<div class="staff-role">{{ person.role }}</div>{% endif %}
        <div class="staff-info">
          {% if person.qq %}<span>💬 QQ：{{ person.qq }}</span>{% endif %}
          {% if person.wechat %}<span>💭 微信：{{ person.wechat }}</span>{% endif %}
          {% if person.phone %}<span>📞 电话：{{ person.phone }}</span>{% endif %}
        </div>
      </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

<!-- 老师 -->
<div class="staff-section">
  <h3>老师</h3>
  <ul class="staff-list">
    {% for person in site.data.staff %}
      {% if person.type == "teacher" %}
      <li>
        <span class="staff-name">{{ person.name }}</span>
        {% if person.role %}<span>学科：{{ person.role }}</span>{% endif %}
        {% if person.phone %}<span>📞 {{ person.phone }}</span>{% endif %}
        {% if person.office %}<span>🏢 {{ person.office }}</span>{% endif %}
        {% if person.email %}<span>✉️ {{ person.email }}</span>{% endif %}
      </li>
      {% endif %}
    {% endfor %}
  </ul>
</div>
