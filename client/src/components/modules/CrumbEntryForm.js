import "../../utilities.css";
import "./CrumbEntryForm.css";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { get, post } from "../../utilities";

// import { createCrumbEntry } from './API';

const CrumbEntryForm = ({ updateCrumbList, latitude, longitude, journey_id, user_id, current_crumbs }) => {
    const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    
    data.creator_id = user_id;
    data.journey_id = journey_id;
    data.latitude = latitude;
    data.longitude = longitude;

    console.log(current_crumbs.length);
    data.crumb_id = journey_id + "_" + (current_crumbs.length + 1);

    console.log(data);

    post("/api/crumb", data).then((update) => {
      // display this comment on the screen
      console.log(update);
    });

    updateCrumbList(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

      <label htmlFor="title">Title</label> <br></br>
      <input name="title" required ref={register} /> <br></br>

      <label htmlFor="description">Description</label> <br></br>
      <textarea name="description" rows={3} ref={register}></textarea> <br></br>
      
      
      <button className="create-button" >Create Entry</button>
    </form>
  );
};

export default CrumbEntryForm;