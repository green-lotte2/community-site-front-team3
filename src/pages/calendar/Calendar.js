import React from "react";
import DefaultLayout from "layouts/DefaultLayout";
import MonthCalendar from "../../components/calendar/MonthCalendar";

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
