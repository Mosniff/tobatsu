"use client";

type TobatsuButtonProps = {
  onClick: () => any;
  text: string;
};

function TobatsuButton({ onClick, text }: TobatsuButtonProps) {
  return (
    <button className="bg-tc2 rounded-lg p-2" onClick={onClick}>
      {text}
    </button>
  );
}

export default TobatsuButton;
