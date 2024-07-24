import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { UserContextType, UserDataType } from "../types/userDataType";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const SingleUser = ({ user }: { user: UserDataType }) => {
    const { setOpenModal, setIsEditing, setCurrentUser } = useContext(UserContext) as UserContextType;

    const handleUpdateClick = () => {
        setOpenModal(true);
        setIsEditing(true);
        setCurrentUser(user);
    }
    return (
        <div className={`grid grid-cols-[3fr_3fr_1fr] text-white bg-[#c067d4] px-6 py-4 rounded-md items-center`}>
            <div className="flex flex-col">
                <p>Name: <span className="text-[#1b263b] ms-3 font-semibold">{user.firstName} {user.lastName}</span></p>
                <p>Email: <span className="text-[#1b263b] ms-3 font-semibold">{user.email}</span></p>
            </div>
            <div className="flex flex-col">
                <p>Role: <span className="text-[#1b263b] ms-3 font-semibold">{user.role}</span></p>
                <p>Salary: <span className="text-[#1b263b] ms-3 font-semibold">{user.salary}</span></p>
            </div>
            <div className="flex gap-4 text-xl">
                <FaEdit onClick={handleUpdateClick} className="cursor-pointer hover:shadow-2xl hover:text-black" />
                <MdDeleteForever className="cursor-pointer hover:shadow-2xl hover:text-black" />
            </div>
        </div>
    )
}

export default SingleUser;