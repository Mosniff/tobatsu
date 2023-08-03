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
} from "@mui/material/";
import AddNewMemberModal from "@/components/modals/AddNewMemberModal";

type Props = {};

function MembersPresentational({}: Props) {
  const supabase = createClientComponentClient();
  const gymId = useParams().id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [gym, setGym] = useState<any>({});
  const [members, setMembers] = useState<any[]>([]);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState<boolean>(false);
  const [instructorsSectionExpanded, setInstructorsSectionExpanded] =
    useState<boolean>(true);
  const [studentsSectionExpanded, setStudentsSectionExpanded] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: gymData, error: gymDataError } = await supabase
        .from("gyms")
        .select()
        .eq("id", gymId)
        .single();
      const { data: membersData, error: membersDataError } = await supabase
        .from("gym_members")
        .select()
        .eq("gym_id", gymId);
      if (membersData && gymData) {
        console.log("hi");
        setMembers(membersData);
        setGym(gymData);
        setLoading(false);
      }

      if (gymDataError || membersDataError) {
        console.log(gymDataError, membersDataError);
      }
    };
    fetchData();
  }, []);

  const addNewMember = async (
    e: any,
    { firstName, lastName, belt, isInstructor }: any
  ) => {
    e.preventDefault();

    const { data, error } = await supabase.from("gym_members").insert([
      {
        gym_id: gymId,
        first_name: firstName,
        last_name: lastName,
        belt: belt,
        is_instructor: isInstructor,
      },
    ]);

    console.log(data, error);

    setAddMemberModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-start w-full p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl">{gym!.name} - Members</h1>
            <TobatsuButton
              onClick={() => setAddMemberModalOpen(true)}
              text="Add New Member"
            />
          </div>
          <CollapsibleMembersList
            members={members.filter((member) => member.is_instructor)}
            listName="Instructors"
          />
          <CollapsibleMembersList
            members={members.filter((member) => !member.is_instructor)}
            listName="Students"
          />
          {/* <Modal
            ariaHideApp={false}
            isOpen={addMemberModalOpen}
            onRequestClose={closeAddMemberModal}
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
            className="w-20 h-20"
          >
            <button onClick={() => setAddMemberModalOpen(false)}>close</button>
            <AddNewMemberForm closeModal={closeAddMemberModal} gymId={gymId} />
          </Modal> */}
          <AddNewMemberModal
            isOpen={addMemberModalOpen}
            onClose={() => setAddMemberModalOpen(false)}
            onSubmit={addNewMember}
          />
        </div>
      )}
    </>
  );
}

export default MembersPresentational;
