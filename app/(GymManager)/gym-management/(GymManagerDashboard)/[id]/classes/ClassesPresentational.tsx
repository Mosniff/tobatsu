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

type Props = {};

function ClassesPresentational({}: Props) {
  const supabase = createClientComponentClient();
  const gymId = useParams().id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [scheduledClasses, setScheduledClasses] = useState<any[]>([]);
  const [createClassModalOpen, setCreateClassModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

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
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduledClasses();
  }, []);

  const handleDateClick = (dateClickInfo: any) => {
    console.log(dateClickInfo.date);
    setSelectedDate(dateClickInfo.date);
    setCreateClassModalOpen(true);
  };
  const handleEventClick = (eventClickInfo: any) => {
    console.log("event", eventClickInfo.event.extendedProps);
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
        </>
      )}
    </div>
  );
}

export default ClassesPresentational;
