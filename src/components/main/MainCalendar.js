import React, { useEffect, useRef, useState } from 'react';
import Calendar, { TZDate } from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { FaCalendarAlt, FaCalendarWeek } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import axios from 'axios';
import { globalPath } from 'globalPaths';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/ko';
import MainEventList from './MainEventList'; // EventList 컴포넌트를 가져옵니다.

function MonthCalendar() {
    const calendarRef = useRef(null);
    const [error, setError] = useState('');
    const [events, setEvents] = useState([]);
    const authSlice = useSelector((state) => state.authSlice);

    useEffect(() => {
        const container = calendarRef.current;
        const options = {
            defaultView: 'month',
            isReadOnly: false,
            timezone: {
                zones: [
                    {
                        timezoneName: 'Asia/Seoul',
                        displayLabel: 'Seoul',
                    },
                ],
            },
            calendars: [
                {
                    id: '1',
                    name: '업무',
                    backgroundColor: '#ff4040',
                },
                {
                    id: '2',
                    name: '미팅',
                    backgroundColor: '#4040ff',
                },
                {
                    id: '3',
                    name: '회의',
                    backgroundColor: '#40ff40',
                },
                {
                    id: '4',
                    name: '미정',
                    backgroundColor: '#FF9900',
                },
            ],
            useDetailPopup: true,
            useFormPopup: true,
        };

        const calendar = new Calendar(container, options);
        const uid = authSlice.uid;
        const uuid = { uid };
        const url = globalPath.path;

        axios
            .post(`${url}/calendar/selects`, uuid)
            .then((response) => {
                const eventsData = response.data.map((event) => {
                    const isReadOnly = event.isReadOnly === 'false' ? false : true;
                    const isAllDay = event.isAllDay === 'false' ? false : true;
                    const selectedCalendar = options.calendars.find((cal) => cal.id === event.calendarId);
                    return {
                        id: event.id,
                        calendarId: event.calendarId,
                        title: event.title,
                        start: Moment(event.start).subtract(1, 'months').format('YYYY-MM-DD[T]HH:mm:ss'),
                        end: Moment(event.end).subtract(1, 'months').format('YYYY-MM-DD[T]HH:mm:ss'),
                        location: event.location,
                        state: event.state,
                        isReadOnly: isReadOnly,
                        isAllDay: isAllDay,
                        backgroundColor: selectedCalendar ? selectedCalendar.backgroundColor : '#000000',
                        color: event.color,
                    };
                });

                setEvents(eventsData);
                calendar.createEvents(eventsData);
            })
            .catch((err) => {
                console.log(err);
                setError('일정을 불러오지 못했습니다.');
            });

        return () => {
            if (calendar) {
                calendar.destroy();
            }
        };
    }, []);

    return (
        <div>
            <MainEventList events={events} />
        </div>
    );
}

export default MonthCalendar;
