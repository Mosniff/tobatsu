"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import Modal from "react-modal";
import AddNewMemberForm from "@/components/AddNewMemberForm";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateClassModal from "@/components/modals/CreateClassModal";
import ClassRegisterModal from "@/components/modals/ClassRegisterModal";

type Props = {};

function ClassesPresentational({}: Props) {
  const supabase = createClientComponentClient();
  const gymId = useParams().id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [scheduledClasses, setScheduledClasses] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [gymMembers, setGymMembers] = useState<any[]>([]);
  const [createClassModalOpen, setCreateClassModalOpen] = useState(false);
  const [classRegisterModalOpen, setClassRegisterModalOpen] = useState(false);

  const fetchScheduledClasses = async () => {
    const { data, error } = await supabase
      .from("scheduled_classes")
      .select()
      .eq("gym_id", gymId);
    if (data) {
      console.log("hi", data);
      setScheduledClasses(
        data.map((scheduledClass) => {
          return {
            title: scheduledClass.name,
            date: scheduledClass.date,
            extendedProps: { classId: scheduledClass.id },
          };
        })
      );
    }

    if (error) {
      console.log(error);
    }
  };

  const fetchGymMembers = async () => {
    const { data, error } = await supabase
      .from("gym_members")
      .select()
      .eq("gym_id", gymId);
    if (data) {
      console.log("hi", data);
      setGymMembers(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduledClasses();
    fetchGymMembers();
    setLoading(false);
  }, []);

  const handleDateClick = (dateClickInfo: any) => {
    console.log(dateClickInfo.date);
    setSelectedDate(dateClickInfo.date);
    setCreateClassModalOpen(true);
  };
  const handleEventClick = (eventClickInfo: any) => {
    console.log("event", eventClickInfo.event.extendedProps);
    setSelectedClassId(eventClickInfo.event.extendedProps.classId);
    setClassRegisterModalOpen(true);
  };

  return (
    <div>
      <h1>Gym Classes Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={scheduledClasses}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
          <CreateClassModal
            modalOpen={createClassModalOpen}
            closeModal={() => setCreateClassModalOpen(false)}
            classDate={selectedDate || new Date()}
            gymId={gymId}
            fetchScheduledClasses={fetchScheduledClasses}
          />
          <ClassRegisterModal
            modalOpen={classRegisterModalOpen}
            closeModal={() => setClassRegisterModalOpen(false)}
            gymMembers={gymMembers}
            gymId={gymId}
            classId={selectedClassId}
          />
        </>
      )}
    </div>
  );
}

export default ClassesPresentational;
