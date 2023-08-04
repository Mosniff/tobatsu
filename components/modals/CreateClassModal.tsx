"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material/";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type CreateClassModalProps = {
  // modalOpen: boolean;
  // closeModal: () => void;
  // classDate: Date;
  // gymId: string;
  // fetchScheduledClasses: () => void;
  isOpen: boolean;
  onClose: () => void;
  classDate: Date;
  scheduleClass: ({ options }: any) => any;
};

function CreateClassModal({
  isOpen,
  onClose,
  classDate,
  scheduleClass,
}: CreateClassModalProps) {
  const [name, setName] = useState<string | null>(null);
  // const supabase = createClientComponentClient();
  const [time, setTime] = useState<string | null>(null);
  // console.log(classDate.toISOString());

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        setName(null);
        setTime(null);
      }}
    >
      <DialogTitle>Schedule a class on {classDate.toDateString()}?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Class Name"
          type="text"
          fullWidth
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            scheduleClass({ name: name, time: time, date: classDate });
            setName(null);
            setTime(null);
            onClose();
          }}
          disabled={!name || !time}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

    // <Modal
    //   isOpen={modalOpen}
    //   onRequestClose={closeModal}
    //   contentLabel="Video Modal"
    //   style={{
    //     overlay: {
    //       backgroundColor: "rgba(0,0,0,0.2)",
    //     },
    //     content: {
    //       width: "850px",
    //       height: "85vh",
    //       margin: "auto", // Center the modal horizontally
    //       padding: "0px",
    //       border: "none",
    //       overflow: "hidden",
    //     },
    //   }}
    // >
    //   <button onClick={closeModal}>close</button>
    //   Do you want to schedule a class on {classDate?.toString()}?
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Class Name</label>
    //     <input
    //       id="name"
    //       type="text"
    //       value={name || ""}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <label htmlFor="time">Time</label>
    //     <input
    //       id="time"
    //       type="time"
    //       value={time || ""}
    //       onChange={(e) => setTime(e.target.value)}
    //     />
    //     <button>Schedule Class</button>
    //   </form>
    // </Modal>
  );
}

export default CreateClassModal;
