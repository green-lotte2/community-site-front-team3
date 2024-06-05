import React, { useRef } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const EventList = ({ events }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            if (direction === 'left') {
                current.scrollLeft -= 450; // 왼쪽으로 스크롤할 픽셀 수
            } else {
                current.scrollLeft += 450; // 오른쪽으로 스크롤할 픽셀 수
            }
        }
    };

    return (
        <div>
            <h3>예정된 이벤트</h3>
            <div className="scroll-container" ref={scrollContainerRef}>
                <IconButton className="scroll-button scroll-button-left" onClick={() => scroll('left')}>
                    <ArrowBackIos />
                </IconButton>
                {events.map((event) => (
                    <div className="scroll-item" key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {event.title}
                                </Typography>
                                <Typography color="textSecondary">
                                    {event.start} - {event.end}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                <IconButton className="scroll-button scroll-button-right" onClick={() => scroll('right')}>
                    <ArrowForwardIos />
                </IconButton>
            </div>
        </div>
    );
};

export default EventList;
