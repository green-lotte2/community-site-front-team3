import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const EventList = ({ events }) => {
    return (
        <>
            <div>
                <h3>예정된 이벤트</h3>
                <Grid container spacing={2}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
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
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default EventList;
