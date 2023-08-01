"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import Modal from "react-modal";
import AddNewMemberForm from "@/components/AddNewMemberForm";

type Props = {};

function MembersPresentational({}: Props) {
  const supabase = createClientComponentClient();
  const gymId = useParams().id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<any[]>([]);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("gym_members")
        .select()
        .eq("gym_id", gymId);
      if (data) {
        setMembers(data);
        setLoading(false);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchMembers();
  });

  const closeAddMemberModal = () => {
    setAddMemberModalOpen(false);
  };

  return (
    <div>
      <h1>Gym Members Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Instructors:</h2>
          <ul>
            {members.map((member) => {
              if (member.is_instructor) {
                return <li>{`${member.first_name} ${member.last_name}`}</li>;
              }
            })}
          </ul>
          <h2>Students:</h2>
          <ul>
            {members.map((member) => {
              if (!member.is_instructor) {
                return <li>{`${member.first_name} ${member.last_name}`}</li>;
              }
            })}
          </ul>
          <button onClick={() => setAddMemberModalOpen(true)}>
            Add New Member
          </button>
          <Modal
            isOpen={addMemberModalOpen}
            onRequestClose={closeAddMemberModal}
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
            <button onClick={() => setAddMemberModalOpen(false)}>close</button>
            <AddNewMemberForm closeModal={closeAddMemberModal} gymId={gymId} />
          </Modal>
        </>
      )}
    </div>
  );
}

export default MembersPresentational;
