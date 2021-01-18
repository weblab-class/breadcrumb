import "../../utilities.css";
import "./CrumbEntryForm.css";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// import { createCrumbEntry } from './API';

const CrumbEntryForm = ({ latitude, longitude, journey_id, user_id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // try {
    //   setLoading(true);
    //   data.latitude = location.latitude;
    //   data.longitude = location.longitude;
    //   await createCrumbEntry(data);
    //   onClose();
    // } catch (error) {
    //   console.error(error);
    //   setError(error.message);
    //   setLoading(false);
    // }
    console.log(data);
    console.log(latitude);
    console.log(longitude);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

      <label htmlFor="title">Title</label> <br></br>
      <input name="title" required ref={register} /> <br></br>

      <label htmlFor="description">Description</label> <br></br>
      <textarea name="description" rows={3} ref={register}></textarea> <br></br>
      
      
      <button className="create-button" disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  );
};

export default CrumbEntryForm;