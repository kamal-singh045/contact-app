import { useContext } from "react";
import { RoleEnum } from "../enums/roleEnum";
import FormModal from "./FormModal";
import SelectComponent from "./SelectComponent";
import { UserContextType } from "../types/contactDataType";
import { UserContext } from "../contexts/ContactsContext";

const Header = () => {
    const { filterContacts, openModal, setOpenModal } = useContext(UserContext) as UserContextType;

    function handleAddClick() {
        setOpenModal(true);
    }
    const handleSelect = (key: string, value: string) => {
        filterContacts(value);
        console.log(key, value);
    }

    return (
        <div className="flex overflow-scroll gap-2 md:gap-4 mx-1 sm:mx-4 mt-6 bg-white rounded-2xl p-4">
            <button onClick={handleAddClick} className="rounded-full shrink-0 px-6 py-1 border border-black">Add</button>
            
            <SelectComponent changeHandler={handleSelect} options={Object.values(RoleEnum)} id="role" defaultValue="Filter By Role" customClasses="border border-black rounded-full" />
            {openModal && <FormModal setOpenModal={setOpenModal} />}
        </div>
    )
}

export default Header;