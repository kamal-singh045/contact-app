import { createContext, useState, useEffect } from "react";
import { ContactDataType, UserContextType } from "../types/contactDataType";
import customAxios from "../helpers/customAxios";

export const UserContext = createContext<UserContextType | null>(null);
export const contactInitialState = {
    _id: "",
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
    const [contacts, setContacts] = useState<ContactDataType[]>([]);
    const [currentContact, setCurrentContact] = useState<ContactDataType>(contactInitialState);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const response = await customAxios({method: "get", url: "get-all-contacts"});
            console.log(response);
            if(response.success) setContacts(response.data);
        }
        fetchData();
    }, []);

    const addContact =async (user: ContactDataType) => {
        const response = await customAxios({method: "post", url: "add-contact", data: user});
        if(response.success) setContacts([...contacts, user]);
    }

    const updateContact = async(user: ContactDataType) => {
        const response = await customAxios({method: "put", url: `update-contact/?id=${user._id}`, data: user});
        if(response.success) setContacts([...contacts].map(ele => {
            if(ele._id === user._id) return user;
            else return ele;
        }));
    }

    const deleteContact = async(id: string) => {
        const response = await customAxios({method: 'delete', url: `delete-contact/?id=${id}`});
        if(response.success) setContacts([...contacts].filter(ele => ele._id !== id));
    }

    const filterContacts = async(role: string) => {
        const response = await customAxios({method: "get", url: `filter-contacts/?key=role&value=${role}`});
        if(response.success) setContacts(response.data);
    }

    return (
        <UserContext.Provider value={{ contacts, addContact, updateContact, deleteContact, filterContacts, isEditing, setIsEditing, currentContact, setCurrentContact, openModal, setOpenModal }}>
            {children}
        </UserContext.Provider>
    )
}
export default UsersProvider;