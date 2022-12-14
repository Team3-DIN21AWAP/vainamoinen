import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useState } from "react";
const V10 = () =>  {
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 4) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2015 UN General Assembly of 194 countries adopts 17 Sustainable Development Goals for 2030, 
          to end poverty and other deprivations by improving health and education, reducing inequalities, 
          addressing climate change and halting biodiversity loss (25/9/2015)
          </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2016	detection of gravitational waves (LIGO and Virgo interferometers, 11/2/2016):
           ripples in spacetime generated by accelerating bodies, predicted by the theory of general relativity
           </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2017	first national legislation for a mid-century target of net-zero emissions 
          (Sweden, 2017)=> Suriname and Bhutan CO₂-negative by 2019; net-zero pledges by governments and companies cover 90% of the global economy by 2021, with big emitters yet to peak
          </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2018	sixfold increase in annual ice loss from Antarctica and Greenland over 25
           years to 2018=> sea-levels to rise 40-80 cm by 2100 under scenarios of low-high greenhouse-gas
            emissions, displacing 190-630 million people
            </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2019	first image of a black hole (Event Horizon Telescope, 10/4/2019), 55 
          million light-years from Earth, 6.5 billion times the mass of the Sun, with spiralling magnetic 
          fields, expelling jets of matter
          </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2020	One Trillion Trees Initiative (World Economic Forum, 2020), planting trees in
           support of the UN Decade on Ecosystem Restoration 2020-2030=> nature-based climate solutions
           </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2021	first powered, controlled flight on another planet: Ingenuity Helicopter drone
           on Mars (NASA, 19/4/2021), hovering 3 m above the Jezero Crater
           </ReadMore></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent><ReadMore>2022	global cost-of-living crisis initiated by demand exceeding supply for resources, 
          intensified by Russia invading Ukraine (24/2/2022), threatening worldwide food and energy security

          </ReadMore></TimelineContent>
      </TimelineItem>
      
    </Timeline>
  );
}

export default V10;
