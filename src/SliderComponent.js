import React from 'react'  
import { endOfToday, set, format } from 'date-fns' 
import TimeRange from 'react-timeline-range-slider'  

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
	set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const startTime = new Date(1551452343128);
const endTime = new Date(1556651554999);

const selectedStart = startTime;
const selectedEnd = endTime;

class Slider extends React.Component { 
    constructor(props){ 
        super(props)
        this.state = {  
            error: false,  
            selectedInterval: [selectedStart, selectedEnd],  
        }
}
	
  errorHandler = ({ error }) => this.setState({ error })  

  onChangeCallback = (selectedInterval) => {
      this.setState({ selectedInterval })
      this.props.markerUpdate(selectedInterval);
  }


  render() {  
    const { selectedInterval, error } = this.state  
      return (
        <div className="container">
        <div className="info">
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d, "- dd MMM - ")}</span>
          ))}
        </div>

        <TimeRange
          error={error}  
          ticksNumber={61}
          step={86400000}  
          selectedInterval={selectedInterval}  
          timelineInterval={[startTime, endTime]}  
          onUpdateCallback={this.errorHandler}  
          onChangeCallback={this.onChangeCallback}
        />
        </div>
      )  
  }  
}  

export default Slider;