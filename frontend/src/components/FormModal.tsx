import { ImCross } from "react-icons/im";
import useOutsideClick from "../helpers/useOutsideClick";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import { RoleEnum } from "../enums/roleEnum";
import { UserDataType, UserContextType } from "../types/userDataType";
import { UserContext } from "../contexts/UserContext";
import { usersFormData } from "../data/formData";
import { userInitialState } from "../contexts/UserContext";

import { useContext } from "react";
interface DataType {
    setOpenModal: (_: boolean) => void;
}

const FormModal: React.FC<DataType> = ({ setOpenModal }) => {
    const { addUser, updateUser, isEditing, setIsEditing, currentUser, setCurrentUser } = useContext(UserContext) as UserContextType;
    const clickRef = useOutsideClick(() => {
        setOpenModal(false);
    });

    const handleForm = (key: string, value: string): void => {
        setCurrentUser({ ...currentUser, [key]: value });
    }

    const handleAddData = (e: React.FormEvent, formData: UserDataType) => {
        e.preventDefault();
        console.log(formData);
        isEditing ? updateUser(formData) : addUser(formData);
        setOpenModal(false);
        setIsEditing(false);
        setCurrentUser(userInitialState);
    }

    return (
        <div ref={clickRef} className={`rounded-md fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[#d6bdf6] w-[97vw] md:w-[90vw] 2xl:w-[60vw] min-h-[20rem] p-4 md:p-8`}>
            <div className="relative">
                <h4 className="text-2xl font-semibold text-center">Fill the details</h4>
                <ImCross onClick={() => setOpenModal(false)} className="absolute top-2 right-0 cursor-pointer" />
                <hr className="h-[1px] bg-white my-4" />
            </div>
            <form onSubmit={(e) => handleAddData(e, currentUser)} className="mt-8 flex flex-col gap-5">
                {usersFormData.map(data => <InputComponent key={data.id} handleForm={handleForm} id={data.id} label={data.label} placeholder={`Enter ${data.label}`} type={data.type ?? "text"} value={currentUser[data.id as keyof UserDataType]} />)}
                <div className="grid grid-cols-[6rem_auto] gap-4 items-center">Role:
                    <SelectComponent changeHandler={handleForm} options={Object.values(RoleEnum).filter(role => role !== RoleEnum.ALL)} id="role" defaultValue={isEditing ? currentUser.role : "Select Role"} customClasses="rounded-md" />
                </div>
                <button className="rounded-md px-8 ms-auto py-1.5 w-fit bg-[#9b5de5] hover:bg-black hover:text-white">{isEditing ? "UPDATE" : "ADD"}</button>
            </form>
        </div>
    )
}
export default FormModal;