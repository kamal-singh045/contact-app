import { useContext } from "react";
import { RoleEnum } from "../enums/roleEnum";
import FormModal from "./FormModal";
import SelectComponent from "./SelectComponent";
import Searchbar from "./Searchbar";
import { ContactsContextType } from "../types/contactDataType";
import { ContactsContext } from "../contexts/ContactsContext";

const Header = () => {
    const { setRoleFilter, openModal, setOpenModal } = useContext(ContactsContext) as ContactsContextType;

    function handleAddClick() {
        setOpenModal(true);
    }
    const handleSelect = (key: string, value: string) => {
        setRoleFilter(value);
        console.log(key, value);
    }

    return (
        <div className="flex overflow-scroll gap-2 md:gap-4 mx-1 sm:mx-4 mt-6 bg-white rounded-md p-4">
            <button onClick={handleAddClick} className="rounded-full shrink-0 px-6 py-1 border border-black">Add</button>
            
            <SelectComponent changeHandler={handleSelect} options={Object.values(RoleEnum)} id="role" defaultValue="Filter By Role" customClasses="border border-black rounded-full" />

            <Searchbar />
            {openModal && <FormModal setOpenModal={setOpenModal} />}
        </div>
    )
}

export default Header;