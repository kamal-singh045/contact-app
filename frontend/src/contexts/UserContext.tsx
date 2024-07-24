import { createContext, useState } from "react";
import { UserDataType, UserContextType } from "../types/userDataType";

export const UserContext = createContext<UserContextType | null>(null);
export const userInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    contactNumber: "",
    role: "",
    address: "",
    joiningDate: "",
    salary: ""
};

const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<UserDataType[]>([]);
    const [currentUser, setCurrentUser] = useState<UserDataType>(userInitialState);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const addUser = (user: UserDataType) => {
        setUsers([...users, user]);
    }

    const updateUser = (user: UserDataType) => {
        console.log(user);
    }

    const deleteUser = () => {

    }

    const filterUsers = (role: string) => {
        if (role === "All") setUsers(users);
        else setUsers(users.filter(data => data.role === role));
    }

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, filterUsers, isEditing, setIsEditing, currentUser, setCurrentUser, openModal, setOpenModal }}>
            {children}
        </UserContext.Provider>
    )
}
export default UsersProvider;