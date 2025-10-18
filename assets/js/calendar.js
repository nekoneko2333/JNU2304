document.addEventListener("DOMContentLoaded", function() {
  const calendarData = JSON.parse(document.getElementById("calendarData").textContent);
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
              span.title = ev.event;
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
});
