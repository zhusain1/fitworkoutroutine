import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Stream } from "@cloudflare/stream-react";

export default function Exercise(props) {
  console.log(props)
  return (
    <div>
      <h2>{props.workout.workoutName}</h2>
      { ReactHtmlParser(props.workout.workoutDescription) }
      <Stream controls src={props.workout.workoutUrl} />
      <small> Created by: {props.workout.email} </small>
      <br/>
    </div>
  );
}