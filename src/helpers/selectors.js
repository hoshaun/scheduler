export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(data => data.name === day)[0];
  const filteredAppointments = filteredDay ? filteredDay.appointments : [];
  const stateAppointments = state.appointments ? Object.values(state.appointments) : [];
  const appointments = [];
  
  for (const id of filteredAppointments) {
    const appointment = stateAppointments.find(appointment => appointment.id === id);
    if (appointment) {
      appointments.push(appointment);
    }
  }
  
  return appointments;
};

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(data => data.name === day)[0];
  const filteredInterviewers = filteredDay ? filteredDay.interviewers : [];
  const stateInterviewers = state.interviewers ? Object.values(state.interviewers) : [];
  const interviewers = [];
  
  for (const id of filteredInterviewers) {
    const interviewer = stateInterviewers.find(interviewer => interviewer.id === id);
    if (interviewer) {
      interviewers.push(interviewer);
    }
  }

  return interviewers;
};

export function getInterview(state, interview) {
  if (!(interview && interview.interviewer)) {
    return null;
  }

  const result = { "student": interview.student };

  for (const key in state.interviewers) {
    if (state.interviewers[key].id === interview.interviewer) {
      result['interviewer'] = state.interviewers[key];
    }
  }

  return result;
};