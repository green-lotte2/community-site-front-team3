import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { useInterval } from 'use-interval';

export default function DateTimeFieldValue() {
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const [nowTime, setNowTime] = useState(Date.now());

    useInterval(() => {
        setNowTime(Date.now());
    }, 1000);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimeField', 'DateTimeField']}>
                <Moment format={'HH:mm:ss'} className={'moment-box'}>
                    {nowTime}
                </Moment>
                <DateTimeField label="현재 시각" value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
