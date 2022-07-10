import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const Forms = ({ openForms, handleCloseForms, componentForms }) => {
  return (
    <Dialog open={openForms} onClose={handleCloseForms}>
      <DialogTitle height="10px">
        <Typography marginX="85%">
          <Button onClick={handleCloseForms} variant="text" color="inherit">
            <CloseIcon />
          </Button>
        </Typography>
      </DialogTitle>
      <DialogContent>{componentForms}</DialogContent>
    </Dialog>
  );
};

export default Forms;
