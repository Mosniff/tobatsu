"use client";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  modalOpen: boolean;
  closeModal: () => void;
  gymId: string;
  gymMembers: any[];
  classId: string;
};

function ClassRegisterModal({
  modalOpen,
  closeModal,
  gymId,
  gymMembers,
  classId,
}: Props) {
  const supabase = createClientComponentClient();
  const [attendingMemberIds, setAttendingMemberIds] = useState<any>(null);
  const [touched, setTouched] = useState<boolean>(false);

  const fetchAttendingMemberIds = async () => {
    const { data, error } = await supabase
      .from("class_attendances")
      .select("*")
      .eq("scheduled_class_id", classId);

    if (data) {
      setAttendingMemberIds(data.map((result) => result.member_id));
    } else if (error) {
    }
  };

  useEffect(() => {
    setTouched(false);
    fetchAttendingMemberIds();
  }, [classId, gymId]);

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
    try {
      // delete every class attendance
      await supabase
        .from("scheduled_class_attendances")
        .delete()
        .eq("scheduled_class_id", classId);

      // create new class attendances
      const newAttendances = attendingMemberIds.map((memberId: string) => ({
        gym_member_id: memberId,
        scheduled_class_id: classId,
      }));
      await supabase.from("class_attendances").insert(newAttendances);

      setTouched(false);
    } catch (error) {}
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal || setTouched(false)}
      contentLabel="Video Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        content: {
          width: "850px",
          height: "85vh",
          margin: "auto", // Center the modal horizontally
          padding: "0px",
          border: "none",
          overflow: "hidden",
        },
      }}
    >
      <button onClick={closeModal}>close</button>
      <p>Register for class {classId}</p>
      {gymMembers.map((member: any) => (
        <p>
          {member.first_name}{" "}
          <input
            type="checkbox"
            checked={attendingMemberIds?.includes(member.id) ? true : false}
            onChange={(event) => handleCheckboxChange(event, member.id)}
          />
        </p>
      ))}
      {touched && <button onClick={handleSave}>Save?</button>}
    </Modal>
  );
}

export default ClassRegisterModal;
