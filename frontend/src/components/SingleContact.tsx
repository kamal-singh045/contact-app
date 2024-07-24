import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { UserContextType, ContactDataType } from "../types/contactDataType";
import { UserContext } from "../contexts/ContactsContext";
import { useContext } from "react";

const SingleContact = ({ contact }: { contact: ContactDataType }) => {
    const { setOpenModal, setIsEditing, setCurrentContact, deleteContact } = useContext(UserContext) as UserContextType;

    const handleUpdateClick = () => {
        setOpenModal(true);
        setIsEditing(true);
        setCurrentContact(contact);
    }

    return (
        <div className={`grid grid-cols-[3fr_3fr_1fr] text-white bg-[#c067d4] px-6 py-4 rounded-md items-center`}>
            <div className="flex flex-col">
                <p>Name: <span className="text-[#1b263b] ms-3 font-semibold">{contact.firstName} {contact.lastName}</span></p>
                <p>Email: <span className="text-[#1b263b] ms-3 font-semibold">{contact.email}</span></p>
            </div>
            <div className="flex flex-col">
                <p>Role: <span className="text-[#1b263b] ms-3 font-semibold">{contact.role}</span></p>
                <p>Salary: <span className="text-[#1b263b] ms-3 font-semibold">{contact.salary}</span></p>
            </div>
            <div className="flex gap-4 text-xl">
                <FaEdit onClick={handleUpdateClick} className="cursor-pointer hover:shadow-2xl hover:text-black" />
                <MdDeleteForever onClick={() => deleteContact(contact._id)} className="cursor-pointer hover:shadow-2xl hover:text-black" />
            </div>
        </div>
    )
}

export default SingleContact;