import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {TimelineOppositeContent, timelineOppositeContentClasses} from "@mui/lab";

const WrappedItem = ({startDate, location}) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        {startDate}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {location}
      </TimelineContent>
    </TimelineItem>
  )
}

export default function BasicTimeline({locationHistory}) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}>
      {
        locationHistory.map(({startDate, location}) => {
          return <WrappedItem startDate={startDate} location={location} />
        })
      }
    </Timeline>
  );
}