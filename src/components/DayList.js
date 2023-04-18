import React from "react";
import 'components/DayListItem.scss';
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListItems = props.days.map(day => {
    return <DayListItem name={day.name} spots={day.spots} />
  });

  return (
    <ul>
      {dayListItems}
    </ul>
  );
}