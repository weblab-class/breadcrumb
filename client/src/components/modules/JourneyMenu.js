import { Link, navigate } from "@reach/router";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import EditTitlePopup from "./EditTitlePopup";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { post } from "../../utilities";
import { withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["DM Sans"],
  },
});

const options = ["Edit crumbs", "Delete journey"];

const ITEM_HEIGHT = 36;

export default function JourneyMenu({ journeyId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setModal] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const startDelete = () => {
    console.log(journeyId);
    post("/api/deletejourney", { journey_id: journeyId });
    window.location.reload();
  };

  const editJourneyTitle = () => {
    console.log("pls edit me");
    handleClickOpen();
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;
    event.currentTarget.dataset.button === "Delete journey"
      ? startDelete()
      : event.currentTarget.dataset.button === "Edit journey title"
      ? editJourneyTitle()
      : event.currentTarget.dataset.button === "Edit crumbs"
      ? navigate("/journey/" + journeyId)
      : console.log("nothing!");
  };
  const StyledMenuIcon = withStyles((theme) => ({
    root: {
      color: "#85523C",
      padding: "0px",
    },
  }))(MoreHorizIcon);

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      color: "#85523C",
      justifyContent: "center",
    },
  }))(MenuItem);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <StyledMenuIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "150px",
              color: "#85523C",
              padding: "0px",
              backgroundColor: "#fff6ee",
              border: "#85523C 1px solid",
            },
          }}
        >
          <EditTitlePopup journeyId={journeyId} />
          {options.map((option) => (
            <MenuItem
              key={option}
              data-button={option}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </ThemeProvider>
  );
}
