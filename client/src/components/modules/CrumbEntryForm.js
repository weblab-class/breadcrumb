import "../../utilities.css";
import "./CrumbEntryForm.css";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// import { createCrumbEntry } from './API';

const CrumbEntryForm = ({ updateCrumbList, latitude, longitude, journey_id, user_id, current_crumbs }) => {
    const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // try {
    //   setLoading(true);
    //   data.latitude = location.latitude;
    //   data.longitude = location.longitude;
    //   await createCrumbEntry(data);
    //   onClose();

    data.creator_id = user_id;
    data.journey_id = journey_id;
    data.latitude = latitude;
    data.longitude = longitude;

    console.log(current_crumbs.length);
    data.crumb_id = journey_id + "_" + (current_crumbs.length + 1);

    console.log(data);

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