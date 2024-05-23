import React, { useEffect, useRef } from "react";
import Calendar from "@toast-ui/calendar/ie11";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

function MonthCalendar() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const container = calendarRef.current;
    const options = {
      defaultView: "month",

      isReadOnly: false,

      // 시간대 설정
      timezone: {
        zones: [
          {
            timezoneName: "Asia/Seoul",
            displayLabel: "Seoul",
          },
        ],
      },
      calendars: [],

      useDetailPopup: true,

      useFormPopup: true,
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    const calendar = new Calendar(container, options);

    calendar.setOptions({
      month: {
        isAlways6Weeks: false,
      },
    });

    // 일정을 생성
    calendar.on("beforeCreateEvent", (event) => {
      const newEvent = {
        id: event.id,
        calendarId: event.calendarId,
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.location,
        category: event.category,
        state: event.state,
        isReadOnly: false,
        isAllDay: event.isAllday,
        color: "#FFFFFF",
        backgroundColor: getRandomColor(),
        customStyle: {
          fontSize: "15px",
        },
      };
      calendar.createEvents([newEvent]);
    });

    // 일정을 수정
    calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      if (changes) {
        changes.customStyle = { fontSize: "15px" };
      }

      calendar.updateEvent(event.id, event.calendarId, changes);
    });

    // 일정을 삭제
    calendar.on("beforeDeleteEvent", (eventObj) => {
      calendar.deleteEvent(eventObj.id, eventObj.calendarId);
    });

    // 월간, 주간, 일 형식으로 변경
    calendar.on("beforeCreateEvent", (event) => {
      calendar.changeView(event === "week" ? "day" : "month");
    });

    // 주말의 배경색을 변경
    calendar.setTheme({
      month: {},
      common: {
        holiday: {
          color: "rgba(255, 64, 64, 1)",
        },
        today: {
          color: "#fff",
          backgroundColor: "orange",
        },
        saturday: {
          color: "rgba(64, 64, 255, 1)",
        },
      },
    });

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, []);

  return <div ref={calendarRef} style={{ width: "100%", height: "600px" }} />;
}

export default MonthCalendar;
