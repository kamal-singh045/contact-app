import SingleContact from "./SingleContact";
import { UserContext } from "../contexts/ContactsContext";
import { useContext } from "react";
import { UserContextType } from "../types/contactDataType";

const ListContainer = () => {
    const { contacts } = useContext(UserContext) as UserContextType;

    return (
        <div className="flex flex-col gap-3 p-4">
            {contacts.map(contact => <SingleContact key={contact._id} contact={contact} />)}
        </div>
    )
}

export default ListContainer;