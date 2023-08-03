"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import Modal from "react-modal";
import AddNewMemberForm from "@/components/AddNewMemberForm";
import CollapsibleMembersList from "@/components/CollapsibleMembersList";
import TobatsuButton from "@/components/TobatsuButton";
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

type AddNewMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: any, options: any) => void;
};

function AddNewMemberModal({
  isOpen,
  onClose,
  onSubmit,
}: AddNewMemberModalProps) {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [belt, setBelt] = useState<string | null>(null);
  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {" "}
      <DialogTitle>Add New Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="belt-label">Belt</InputLabel>
            <Select
              labelId="belt-label"
              id="belt"
              value={belt || ""}
              label="Belt"
              onChange={(e) => setBelt(e.target.value)}
            >
              <MenuItem value="none">none</MenuItem>
              <MenuItem value="white">white</MenuItem>
              <MenuItem value="blue">blue</MenuItem>
              <MenuItem value="purple">purple</MenuItem>
              <MenuItem value="brown">brown</MenuItem>
              <MenuItem value="black">black</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ marginLeft: "1rem" }}>
            <FormControl margin="dense" fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isInstructor}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      return e.target.checked
                        ? setIsInstructor(true)
                        : setIsInstructor(false);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Instructor?"
              />
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={(e) =>
            onSubmit(e, {
              first_name: firstName,
              last_name: lastName,
              belt: belt,
              is_instructor: isInstructor,
            })
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewMemberModal;
