document.addEventListener("DOMContentLoaded", function() {
  const calendarData = JSON.parse(document.getElementById("calendarData").textContent);
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;

  // 获取当前月份的所有事件
  function getMonthEvents() {
    return calendarData.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month;
    });
  }

  // 更新事件统计
  function updateEventStats() {
    const monthEvents = getMonthEvents();
    const statsEl = document.getElementById("eventStats");
    if (statsEl) {
      if (monthEvents.length > 0) {
        statsEl.textContent = `本月共有 ${monthEvents.length} 个事件`;
        statsEl.style.display = "block";
      } else {
        statsEl.style.display = "none";
      }
    }
  }

  // 显示事件详情模态框
  function showEventModal(dateStr, events) {
    const modal = document.getElementById("eventModal");
    const modalDateTitle = document.getElementById("modalDateTitle");
    const modalDateText = document.getElementById("modalDateText");
    const modalEventsList = document.getElementById("modalEventsList");
    
    if (!modal) return;
    
    // 格式化日期显示
    const date = new Date(dateStr);
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const dateStrFormatted = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${weekdays[date.getDay()]}`;
    
    modalDateTitle.textContent = `${date.getMonth() + 1}月${date.getDate()}日`;
    modalDateText.textContent = dateStrFormatted;
    
    // 清空事件列表
    modalEventsList.innerHTML = "";
    
    if (events && events.length > 0) {
      events.forEach(ev => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event-modal-event";
        
        if (ev.link) {
          eventDiv.classList.add("has-link");
          eventDiv.addEventListener("click", (e) => {
            e.stopPropagation(); // 阻止事件冒泡，避免关闭模态框
            window.open(ev.link, ev.linkTarget || "_blank");
          });
        }
        
        const titleDiv = document.createElement("div");
        titleDiv.className = "event-modal-event-title";
        titleDiv.textContent = ev.event;
        
        const typeSpan = document.createElement("span");
        typeSpan.className = "event-modal-event-type " + (ev.type || "");
        const typeNames = {
          homework: "作业",
          test: "考试",
          activity: "活动"
        };
        typeSpan.textContent = typeNames[ev.type] || ev.type || "其他";
        
        eventDiv.appendChild(titleDiv);
        eventDiv.appendChild(typeSpan);
        modalEventsList.appendChild(eventDiv);
      });
    } else {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "event-modal-empty";
      emptyDiv.textContent = "该日期暂无事件";
      modalEventsList.appendChild(emptyDiv);
    }
    
    // 显示模态框
    modal.classList.add("show");
    
    // 阻止背景滚动
    document.body.style.overflow = "hidden";
  }
  
  // 关闭模态框
  function closeEventModal() {
    const modal = document.getElementById("eventModal");
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

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
          td.classList.add("empty");
        } else {
          const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(dayCounter).padStart(2,"0")}`;
          const dayNumber = document.createElement("div");
          dayNumber.className = "day-number";
          dayNumber.textContent = dayCounter;
          td.appendChild(dayNumber);

          const events = calendarData.filter(e => e.date === dateStr);
          if (events.length) {
            const container = document.createElement("div");
            container.className = "events-container";
            
            // 根据屏幕宽度决定显示的事件数量
            const isMobile = window.innerWidth <= 480;
            const maxVisible = isMobile ? 1 : 2;
            const visibleEvents = events.slice(0, maxVisible);
            const remainingCount = events.length - maxVisible;
            
            visibleEvents.forEach(ev => {
              const span = document.createElement("span");
              span.className = "event " + (ev.type || "");
              span.textContent = ev.event;
              span.title = ev.event;
              
              // 为事件添加点击事件
              span.addEventListener("click", (e) => {
                e.stopPropagation(); // 阻止触发日期单元格的点击事件
                
                // 如果事件有链接，跳转到链接
                if (ev.link) {
                  window.open(ev.link, ev.linkTarget || "_blank");
                } else {
                  // 如果没有链接，显示该日期的详情模态框
                  showEventModal(dateStr, events);
                }
              });
              
              container.appendChild(span);
            });
            
            if (remainingCount > 0) {
              const moreSpan = document.createElement("span");
              moreSpan.className = "event-more";
              moreSpan.textContent = `+${remainingCount}`;
              moreSpan.title = events.slice(maxVisible).map(e => e.event).join("\n");
              // 点击"更多"时显示详情模态框
              moreSpan.addEventListener("click", (e) => {
                e.stopPropagation();
                showEventModal(dateStr, events);
              });
              container.appendChild(moreSpan);
            }
            
            // 添加完整事件列表到 title 属性
            td.title = events.map(e => e.event).join("\n");
            td.classList.add("has-events");
            td.appendChild(container);
          }
          
          // 为日期单元格添加点击事件，显示详情模态框
          if (!td.classList.contains("empty")) {
            td.addEventListener("click", (e) => {
              // 如果点击的是事件本身或事件容器，不触发日期点击（事件有自己的点击处理）
              if (e.target.classList.contains("event") || 
                  e.target.classList.contains("event-more") ||
                  e.target.closest(".events-container")) {
                return;
              }
              showEventModal(dateStr, events);
            });
          }

          // 标记今天
          if (today.getFullYear() === year && today.getMonth()+1 === month && today.getDate() === dayCounter) {
            td.classList.add("today");
          }

          // 标记过去的日期
          const cellDate = new Date(year, month - 1, dayCounter);
          if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            td.classList.add("past");
          }

          dayCounter++;
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    
    document.getElementById("monthTitle").textContent = `${year}年${month}月`;
    updateEventStats();
  }

  // 回到今天
  function goToToday() {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
    renderCalendar();
  }

  // 检查是否在当前月份
  function isCurrentMonth() {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() + 1 === month;
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

  const todayBtn = document.getElementById("todayBtn");
  if (todayBtn) {
    todayBtn.addEventListener("click", goToToday);
  }

  // 窗口大小改变时重新渲染，以适配移动端
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderCalendar();
    }, 150);
  });
  
  // 绑定关闭按钮事件
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeEventModal);
  }
  
  // 点击背景关闭模态框
  const modal = document.getElementById("eventModal");
  if (modal) {
    const modalContent = modal.querySelector(".event-modal-content");
    modal.addEventListener("click", (e) => {
      // 只有点击背景（modal本身）或点击内容区域外部时才关闭
      // 点击内容区域内部不会关闭
      if (e.target === modal) {
        closeEventModal();
      }
    });
    
    // 阻止内容区域的点击事件冒泡到modal
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
  
  // ESC 键关闭模态框
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEventModal();
    }
  });

  renderCalendar();
});
