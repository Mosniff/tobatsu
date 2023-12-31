"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material/";

type ClassRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
  gymMembers: any[];
  sendToast: (message: string) => void;
};

function ClassRegisterModal({
  isOpen,
  onClose,
  classId,
  gymMembers,
  sendToast,
}: ClassRegisterModalProps) {
  const supabase = createClientComponentClient();
  const [scheduledClass, setScheduledClass] = useState<any>(null);
  const [attendingMemberIds, setAttendingMemberIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [touched, setTouched] = useState<boolean>(false);

  const fetchScheduledClass = async () => {
    if (classId) {
      const { data, error } = await supabase
        .from("scheduled_classes")
        .select("*")
        .eq("id", classId)
        .single();

      if (data) {
        setScheduledClass(data);
        setLoading(false);
      } else if (error) {
        console.log(error);
      }
    }
  };

  const fetchAttendingMemberIds = async () => {
    if (classId) {
      const { data, error } = await supabase
        .from("class_attendances")
        .select("*")
        .eq("scheduled_class_id", classId);

      if (data) {
        setAttendingMemberIds(data.map((result) => result.gym_member_id));
      } else if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchScheduledClass();
    fetchAttendingMemberIds();
    setTouched(false);
  }, [classId]);

  const handleCheckboxChange = (event: any, memberId: any) => {
    const { checked } = event.target;
    if (checked) {
      const newAttendingMemberIds = [...attendingMemberIds, memberId];
      setAttendingMemberIds(newAttendingMemberIds);
      setTouched(true);
    } else if (!checked) {
      const newAttendingMemberIds = attendingMemberIds.filter(
        (id: string) => id != memberId
      );
      setAttendingMemberIds(newAttendingMemberIds);
      setTouched(true);
    }
  };

  const handleSave = async () => {
    // delete every class attendance
    const { error: deleteError } = await supabase
      .from("class_attendances")
      .delete()
      .eq("scheduled_class_id", classId);

    // create new class attendances
    const newAttendances = attendingMemberIds.map((memberId: string) => ({
      gym_member_id: memberId,
      scheduled_class_id: classId,
    }));
    const { error: insertError } = await supabase
      .from("class_attendances")
      .insert(newAttendances);

    setTouched(false);
    onClose();
    if (deleteError || insertError) {
      console.log(deleteError, insertError);
      sendToast("Something went wrong!");
    } else {
      sendToast("Register saved.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose(), setLoading(true);
      }}
    >
      {!loading && (
        <>
          <DialogTitle>
            Class Register for {scheduledClass.name} - {scheduledClass.date}
          </DialogTitle>
          <DialogContent>
            {gymMembers.map((member: any) => (
              <FormControl margin="dense" fullWidth key={member.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        attendingMemberIds?.includes(member.id) ? true : false
                      }
                      onChange={(event) => {
                        handleCheckboxChange(event, member.id);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={`${member.first_name || ""} ${member.last_name || ""}`}
                />
              </FormControl>
            ))}
          </DialogContent>
          <DialogActions>
            {touched && (
              <>
                <Button onClick={onClose}>Discard Changes</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default ClassRegisterModal;
