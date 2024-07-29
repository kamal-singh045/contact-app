import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ContactsContextType, ContactDataType } from "../types/contactDataType";
import { ContactsContext } from "../contexts/ContactsContext";
import { useContext, useState } from "react";
import { RiArrowUpDoubleFill, RiArrowDownDoubleFill } from "react-icons/ri";

const SingleContact = ({
  contact,
  bgColor,
}: {
  contact: ContactDataType;
  bgColor: string;
}) => {
  const {
    setOpenModal,
    setIsEditing,
    setCurrentContact,
    deleteContact,
    methods,
  } = useContext(ContactsContext) as ContactsContextType;
  const [readMore, setReadMore] = useState(false);

  const handleUpdateClick = () => {
    setOpenModal(true);
    setIsEditing(true);
    setCurrentContact(contact);
    methods.reset({
      ...contact,
      dateOfBirth: contact.dateOfBirth.slice(0, 10),
      joiningDate: contact.joiningDate.slice(0, 10),
    });
  };

  const handleReadMore = () => {
    setReadMore((prev) => !prev);
  };

  return (
    <div
      className={`text-[#d2d0d0] ${bgColor} px-6 py-4 pb-6 rounded-md relative`}
    >
      <p className="text-center text-white font-semibold text-xl mb-3">
        {contact.firstName} {contact.lastName}
      </p>
      <div className="grid md:grid-cols-[1fr_1fr]">
        <p>
          Email:{" "}
          <span className="text-[#1b263b] ms-3 font-semibold">
            {contact.email}
          </span>
        </p>
        <p>
          Role:{" "}
          <span className="text-[#1b263b] ms-3 font-semibold">
            {contact.role}
          </span>
        </p>
        {readMore && (
          <>
            <p>
              Salary:{" "}
              <span className="text-[#1b263b] ms-3 font-semibold">
                {contact.salary}
              </span>
            </p>
            <p>
              Address:{" "}
              <span className="text-[#1b263b] ms-3 font-semibold">
                {contact.address}
              </span>
            </p>
            <p>
              Contact No.:{" "}
              <span className="text-[#1b263b] ms-3 font-semibold">
                {contact.contactNumber}
              </span>
            </p>
            <p>
              Date of Birth:{" "}
              <span className="text-[#1b263b] ms-3 font-semibold">
                {contact.dateOfBirth}
              </span>
            </p>
            <p>
              Joining Date:{" "}
              <span className="text-[#1b263b] ms-3 font-semibold">
                {contact.joiningDate}
              </span>
            </p>
          </>
        )}
      </div>
      <span
        onClick={handleReadMore}
        className={`absolute text-white text-2xl bottom-0 left-[50%] cursor-pointer`}
      >
        {readMore ? <RiArrowUpDoubleFill /> : <RiArrowDownDoubleFill />}{" "}
      </span>
      <div className="flex gap-4 text-xl absolute top-8 right-2 text-white">
        <FaEdit
          onClick={handleUpdateClick}
          className="cursor-pointer text-[#06aed5] text-2xl"
        />
        <MdDeleteForever
          onClick={() => deleteContact(contact._id)}
          className="cursor-pointer text-[#ef2917] text-2xl"
        />
      </div>
    </div>
  );
};

export default SingleContact;
