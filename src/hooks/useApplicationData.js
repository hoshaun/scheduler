import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // PUT request to save a new interview and update state
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateSpots(state, appointments);
    
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState({ ...state, days, appointments });
      });
  };

  // DELETE request to delete an existing interview and update state
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, days, appointments });
      });
  };
  
  // setDay state function
  const setDay = day => setState({ ...state, day });

  // returns a deep copy of days state object with updated spot count
  const updateSpots = function(state, appointments) {
    const days = JSON.parse(JSON.stringify(state.days));
    const day = days.find(day => day.name === state.day);
    let newSpots = 0;
  
    for (const appointmentId of day.appointments) {
      const appointment = Object.values(appointments).find(appointment => appointmentId === appointment.id);
      if (!appointment.interview) {
        newSpots++;
      }
    }

    day.spots = newSpots;
    
    return days;
  };

  // GET requests to get data and rerender components
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });  
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};