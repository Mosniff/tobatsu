"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AddNewMemberFormProps = {
  gymId: string;
  closeModal: () => void;
};

function AddNewMemberForm({ gymId, closeModal }: AddNewMemberFormProps) {
  const supabase = createClientComponentClient();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [belt, setBelt] = useState<string | null>(null);
  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
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

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        value={firstName || ""}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        value={lastName || ""}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="belt">Belt</label>
      <select
        id="belt"
        onChange={(e) => setBelt(e.target.value)}
        value={belt || ""}
      >
        <option value="none">none</option>
        <option value="white">white</option>
        <option value="blue">blue</option>
        <option value="purple">purple</option>
        <option value="brown">brown</option>
        <option value="black">black</option>
      </select>
      <label htmlFor="isInstructor">Instructor?</label>
      <input
        type="checkbox"
        id="isInstructor"
        name="isInstructor"
        onChange={(e) => {
          console.log(e.target.checked);
          return e.target.checked
            ? setIsInstructor(true)
            : setIsInstructor(false);
        }}
      />
      <button>Submit?</button>
    </form>
  );
}

export default AddNewMemberForm;
