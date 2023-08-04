"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import CollapsibleMembersList from "@/components/CollapsibleMembersList";
import TobatsuButton from "@/components/TobatsuButton";
import AddNewMemberModal from "@/components/modals/AddNewMemberModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

function MembersPresentational({}: Props) {
  const supabase = createClientComponentClient();
  const gymId = useParams().id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [gym, setGym] = useState<any>({});
  const [members, setMembers] = useState<any[]>([]);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState<boolean>(false);

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
      setMembers(membersData);
      setGym(gymData);
      setLoading(false);
    }

    if (gymDataError || membersDataError) {
      console.log(gymDataError, membersDataError);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addNewMember = async ({
    firstName,
    lastName,
    belt,
    isInstructor,
  }: any) => {
    const { error } = await supabase.from("gym_members").insert([
      {
        gym_id: gymId,
        first_name: firstName,
        last_name: lastName,
        belt: belt,
        is_instructor: isInstructor,
      },
    ]);

    fetchData();
    setAddMemberModalOpen(false);

    if (error) {
      console.log(error);
      toast("Something went wrong!");
    } else {
      toast("Member added.");
    }
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
          <AddNewMemberModal
            isOpen={addMemberModalOpen}
            onClose={() => setAddMemberModalOpen(false)}
            onSubmit={addNewMember}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default MembersPresentational;
