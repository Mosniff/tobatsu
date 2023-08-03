"use client";
import Image from "next/image";

type MemberCardProps = {
  firstName?: string;
  lastName?: string;
  belt?: string;
};

function MemberCard({ firstName, lastName, belt }: MemberCardProps) {
  return (
    <div className="w-52 p-2 flex flex-col items-center rounded-md border-2 bg-tc-background-light">
      <div className="rounded-md border w-40 h-40 overflow-hidden">
        <Image
          src="https://picsum.photos/160/160"
          width={500}
          height={500}
          alt={`Profile image for ${firstName} ${lastName}`}
        />
      </div>
      <div className="text-center">
        <p>
          {firstName} {lastName}
        </p>
        <p className="capitalize">{belt ? `${belt} belt` : ""}</p>
      </div>
    </div>
  );
}

export default MemberCard;
