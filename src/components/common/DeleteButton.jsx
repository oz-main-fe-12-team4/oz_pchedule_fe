import { TbTrash } from "react-icons/tb";

const DeleteButton = ({ size = 30, ...props }) => {
  return (
    <>
      <button {...props}>
        <TbTrash
          size={size}
          className="cursor-pointer text-[#d9d9d9] hover:text-[#5C5C5C]"
        />
      </button>
    </>
  );
};

export default DeleteButton;
