import React from "react";
import 'components/DayListItem.scss';
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListItems = props.days.map(day => {
    return <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots}
        selected={day.name === props.day} 
        setDay={() => props.setDay(day.name)}
      />
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
}