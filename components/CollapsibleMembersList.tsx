"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MemberCard from "./MemberCard";
import { useParams } from "next/navigation";
import Link from "next/link";

type CollapsibleMembersListProps = {
  members: any[];
  listName: string;
};

function CollapsibleMembersList({
  members,
  listName,
}: CollapsibleMembersListProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const gymId = useParams().id as string;

  return (
    <div>
      <div className="flex gap-3 items-center my-6">
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`cursor-pointer collapsible-icon ${
            expanded ? " collapsible-icon--rotated" : ""
          }`}
          onClick={() => setExpanded(!expanded)}
        />
        <h2 className="text-xl">{listName}</h2>
      </div>
      <ul
        className={`collapsible-section${
          !expanded ? " collapsible-section--collapsed" : ""
        }`}
      >
        {members.map((member) => {
          return (
            <Link
              href={`/gym-management/${gymId}/members/${member.id}`}
              key={member.id}
            >
              <MemberCard
                firstName={member.first_name}
                lastName={member.last_name}
                belt={member.belt}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default CollapsibleMembersList;
