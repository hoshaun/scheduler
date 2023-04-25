import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    '--selected': props.selected,
    '--full': props.spots === 0
  }).replace(/\s/g, '');

  return (
    <li 
      className={dayClass} 
      onClick={props.setDay}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {formatSpots(props.spots)} remaining
      </h3>
    </li>
  );
}

const formatSpots = function(spots) {
  return `${spots === 0 ? 'no' : spots} ${spots === 1 ? 'spot' : 'spots'}`;
};