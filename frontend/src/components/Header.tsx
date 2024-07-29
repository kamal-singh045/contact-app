import { useContext } from "react";
import { RoleEnum } from "../enums/roleEnum";
import FormModal from "./FormModal";
import SelectComponent from "./inputs/SelectComponent";
import Searchbar from "./Searchbar";
import { ContactsContextType } from "../types/contactDataType";
import { ContactsContext } from "../contexts/ContactsContext";
import { FormProvider, useForm } from "react-hook-form";

const Header = () => {
    const { setRoleFilter, openModal, setOpenModal } = useContext(ContactsContext) as ContactsContextType;
    const headerMethods = useForm();

    function handleAddClick() {
        setOpenModal(true);
    }

    const roleChangeHandler = (data: { [key: string]: string }) => {
        console.log(data)
        setRoleFilter(data.Roles);
    }

    return (
        <div className="flex overflow-scroll gap-2 md:gap-4 mx-1 sm:mx-4 mt-6 bg-white rounded-md p-4">
            <button onClick={handleAddClick} className="rounded-full shrink-0 px-6 py-1 border border-black">Add</button>

            <FormProvider {...headerMethods}>
                <form onChange={headerMethods.handleSubmit(roleChangeHandler)}>
                    <SelectComponent options={Object.values(RoleEnum)} name="Roles" defaultValue="Filter By Role" customClasses="border border-black rounded-full" />
                </form>
            </FormProvider>

            <Searchbar />
            {openModal && <FormModal setOpenModal={setOpenModal} />}
        </div>
    )
}

export default Header;