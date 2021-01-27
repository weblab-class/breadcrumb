import "../../utilities.css";
import "./CrumbEntryForm.css";

import React, { useState } from "react";
import { get, post } from "../../utilities";

import { useForm } from "react-hook-form";

const readImage = (blob) => {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => {
      if (r.error) {
        reject(r.error.message);
        return;
      } else if (r.result.length < 50) {
        // too short. probably just failed to read, or ridiculously small image
        reject("small image? or truncated response");
        return;
      } else if (!r.result.startsWith("data:image/")) {
        reject("not an image!");
        return;
      } else {
        resolve(r.result);
      }
    };
    r.readAsDataURL(blob);
  });
};

const CrumbEntryForm = ({
  updateCrumbList,
  latitude,
  longitude,
  journey_id,
  user_id,
  current_crumbs,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.creator_id = user_id;
    data.journey_id = journey_id;
    data.latitude = latitude;
    data.longitude = longitude;
    data.crumb_id = journey_id + "_" + (current_crumbs.length + 1);

    if (typeof fileInput.files[0] == "undefined") {
      data.image_name = "none";

      post("/api/crumb", data);

      updateCrumbList(data);
    } else {
      readImage(fileInput.files[0]).then((image) => {
        data.image_name = image;
        post("/api/crumb", data).then((update) => {
          data.image_name = update.image_name;
        });

        updateCrumbList(data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      <label htmlFor="title">Title</label> <br></br>
      <input name="title" required ref={register} /> <br></br>
      <label htmlFor="description">Description</label> <br></br>
      <textarea name="description" rows={3} ref={register}></textarea> <br></br>
      <label htmlFor="image">Image</label> <br></br>
      <input
        className="file-upload"
        id="fileInput"
        type="file"
        name="files[]"
        accept="image/*"
      />{" "}
      <br></br>
      <button className="create-button">Create Entry</button>
    </form>
  );
};

export default CrumbEntryForm;
