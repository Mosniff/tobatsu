"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MemberCard from "./MemberCard";

type CollapsibleMembersListProps = {
  members: any[];
  listName: string;
};

function CollapsibleMembersList({
  members,
  listName,
}: CollapsibleMembersListProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div>
      <div className="flex gap-3 items-center my-4">
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
        className={`flex gap-4 collapsible-section${
          !expanded ? " collapsible-section--collapsed" : ""
        }`}
      >
        {members.map((member) => {
          return (
            <MemberCard
              key={member.id}
              firstName={member.first_name}
              lastName={member.last_name}
              belt={member.belt}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CollapsibleMembersList;
