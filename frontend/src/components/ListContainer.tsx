import SingleContact from "./SingleContact";
import { ContactsContext } from "../contexts/ContactsContext";
import { useContext } from "react";
import { ContactsContextType } from "../types/contactDataType";

const ListContainer = () => {
    const { contacts} = useContext(ContactsContext) as ContactsContextType;

    return (
        <div className="flex flex-col gap-3 p-4 min-h-[80vh]">
            {contacts.map((contact, index) => <SingleContact key={contact._id} contact={contact} bgColor={index%2 ? "bg-[#5c677d]" : "bg-[#7d8597]"} />)}
        </div>
    )
}

export default ListContainer;