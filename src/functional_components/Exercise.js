import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Stream } from "@cloudflare/stream-react";

export default function Exercise(props) {
  return (
    <div>
      <h2>{props.workout.workout.workoutName}</h2>
      { ReactHtmlParser(props.workout.workout.workoutDescription) }
      <Stream controls src={props.workout.workout.workoutUrl} />
      <small> Created by: {props.workout.workout.email} </small>
      <br/>
    </div>
  );
}