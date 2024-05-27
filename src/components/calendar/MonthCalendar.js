import React, { useEffect, useRef } from "react";
import Calendar from "@toast-ui/calendar/ie11";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

function MonthCalendar() {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);

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

    // 테마 변경
    calendar.setTheme({
      month: {
        startDayOfWeek: 0,
        daynames: ["일", "월", "화", "수", "목", "금", "토"],
        format: "YYYY-MM",
      },
      week: {
        startDayOfWeek: 0,
        daynames: ["일", "월", "화", "수", "목", "금", "토"],
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
      },
      common: {
        // 쉬는날 빨간색
        holiday: {
          color: "rgba(255, 64, 64, 1)",
        },
        // 오늘 날짜 표시 커스텀
        today: {
          color: "#fff",
          backgroundColor: "orange",
        },
        // 토요일 파란색
        saturday: {
          color: "rgba(64, 64, 255, 1)",
        },
      },
    });

    // 다음 주로 이동하는 버튼
    const handleClickNextButton = () => {
      calendar.next();
    };

    // 한 주 스케줄 보기
    const weekChangeButton = () => {
      calendar.changeView("week");
    };

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, []);

  const container = calendarRef.current;
  const options = {
    defaultView: "month",

    isReadOnly: false,

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
  const calendar = new Calendar(container, options);

  const handleViewChange = (view) => {
    if (calendar) {
      calendar.changeView(view);
    }
  };

  const buttonStyle = {
    borderRadius: "25px",
    border: "2px solid #ddd",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button style={buttonStyle} onClick={() => handleViewChange("month")}>
          월간 형식
        </button>
        <button style={buttonStyle} onClick={() => handleViewChange("week")}>
          주간 형식
        </button>
      </div>
      <div ref={calendarRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
}

export default MonthCalendar;
