import React from "react";

import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const interview = props.interview;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} /> 
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={back}
        />
      )}
    </article>
  );
}