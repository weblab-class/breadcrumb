import React, { useRef } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { post } from "../../utilities";
import { withStyles } from "@material-ui/core/styles";

export default function EditTitlePopup({ journeyId }) {
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const valueRef = useRef("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setOpen(false);
    post("/api/journeytitle", {
      journey_id: journeyId,
      new_title: valueRef.current.value,
    });
    window.location.reload();
  };

  const StyledDialog = withStyles((theme) => ({
    paper: {
      backgroundColor: "#fff6ee",
    },
  }))(Dialog);

  return (
    <div>
      <MenuItem key="edit" onClick={handleClickOpen}>
        Edit journey title
      </MenuItem>

      <StyledDialog
        open={open}
        onClose={handleClose}
        background-color="#85523C"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit journey title</DialogTitle>
        <DialogContent>
          <DialogContentText>Max 20 characters</DialogContentText>
          <TextField
            inputRef={valueRef}
            autoFocus
            onKeyDown={(e) => e.stopPropagation()}
            backgroundcolor="#85523C"
            margin="dense"
            inputProps={{ maxLength: 20 }}
            id="name"
            label="Journey Title"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} data-button="Submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
