import { ImCross } from "react-icons/im";
import useOutsideClick from "../helpers/useOutsideClick";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import { RoleEnum } from "../enums/roleEnum";
import { ContactDataType, ContactsContextType } from "../types/contactDataType";
import { ContactsContext } from "../contexts/ContactsContext";
import { usersFormData } from "../data/formData";
import { contactInitialState } from "../contexts/ContactsContext";

import { useContext, useState } from "react";
import ContactSchema from "../validators/contactValidation";

interface DataType {
    setOpenModal: (_: boolean) => void;
}

const FormModal: React.FC<DataType> = ({ setOpenModal }) => {
    const { addContact, updateContact, isEditing, setIsEditing, currentContact, setCurrentContact } = useContext(ContactsContext) as ContactsContextType;
    const clickRef = useOutsideClick(() => { setOpenModal(false); });
    const [formErrors, setFormErrors] = useState<any>({});

    const handleForm = (key: string, value: string): void => {
        setCurrentContact({ ...currentContact, [key]: value });
    }

    const handleAddData = (e: React.FormEvent, formData: ContactDataType) => {
        e.preventDefault();
        try {
            const parsedData = ContactSchema.safeParse(formData);
            if(!parsedData.success){
                const errors: any = {};
                parsedData.error.issues.forEach(err => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
                return;
            }
            
            isEditing ? updateContact(parsedData.data as ContactDataType) : addContact(parsedData.data as ContactDataType);
            setOpenModal(false);
            setIsEditing(false);
            setCurrentContact(contactInitialState);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div ref={clickRef} className={`rounded-md fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[#d6bdf6] w-[97vw] md:w-[90vw] 2xl:w-[60vw] min-h-[20rem] p-4 md:p-8 z-10`}>
            <div className="relative">
                <h4 className="text-2xl font-semibold text-center">Fill the details</h4>
                <ImCross onClick={() => setOpenModal(false)} className="absolute top-2 right-0 cursor-pointer" />
                <hr className="h-[1px] bg-white my-4" />
            </div>
            <form onSubmit={(e) => handleAddData(e, currentContact)} className="mt-8 flex flex-col gap-8">
                {usersFormData.map(data => <InputComponent key={data.id} handleForm={handleForm} id={data.id} label={data.label} placeholder={`Enter ${data.label}`} error={formErrors[data.id]} type={data.type ?? "text"} value={currentContact[data.id as keyof ContactDataType]} />)}

                <div className="grid grid-cols-[6rem_auto] gap-4 items-center">Role:
                    <SelectComponent changeHandler={handleForm} options={Object.values(RoleEnum).filter(role => role !== RoleEnum.ALL)} id="role" defaultValue={isEditing ? currentContact.role : "Select Role"} customClasses="rounded-md" roleError={formErrors?.role} />
                </div>
                <button className="rounded-md px-8 ms-auto py-1.5 w-fit bg-[#9b5de5] hover:bg-black hover:text-white">{isEditing ? "UPDATE" : "ADD"}</button>
            </form>
        </div>
    )
}
export default FormModal;