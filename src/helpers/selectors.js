export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(data => data.name === day)[0];
  const filteredAppointments = filteredDay ? filteredDay.appointments : [];
  const appointments = [];
  
  for (const key in state.appointments) {
    if (filteredAppointments.includes(state.appointments[key].id)) {
      appointments.push(state.appointments[key]);
    }
  }
  
  return appointments;
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