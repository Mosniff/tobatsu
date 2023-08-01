"use client";
import Modal from "react-modal";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  modalOpen: boolean;
  closeModal: () => void;
  classDate: Date;
  gymId: string;
  fetchScheduledClasses: () => void;
};

function CreateClassModal({
  modalOpen,
  closeModal,
  classDate,
  gymId,
  fetchScheduledClasses,
}: Props) {
  const supabase = createClientComponentClient();
  const [name, setName] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  console.log(classDate.toISOString());

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(typeof time, time);

    const { data, error } = await supabase.from("scheduled_classes").insert([
      {
        gym_id: gymId,
        name: name,
        time: time,
        date: classDate.toISOString(),
      },
    ]);

    console.log(data, error);
    fetchScheduledClasses();
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
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
      Do you want to schedule a class on {classDate?.toString()}?
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Class Name</label>
        <input
          id="name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          value={time || ""}
          onChange={(e) => setTime(e.target.value)}
        />
        <button>Schedule Class</button>
      </form>
    </Modal>
  );
}

export default CreateClassModal;
