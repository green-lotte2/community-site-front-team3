import React from "react";
import DefaultLayout from "layouts/DefaultLayout";
import MonthCalendar from "../../components/calendar/MonthCalendar";
import CalendarHead from "../../components/calendar/CalendarHead";

const Calendar = () => {
  return (
    <DefaultLayout>
      <div className="calendar">
        <MonthCalendar />
      </div>
    </DefaultLayout>
  );
};

export default Calendar;
