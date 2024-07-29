import { useContext } from "react";
import { ImCross } from "react-icons/im";
import useOutsideClick from "../helpers/useOutsideClick";
import InputComponent from "./inputs/InputComponent";
import SelectComponent from "./inputs/SelectComponent";
import { RoleEnum } from "../enums/roleEnum";
import { ContactDataType, ContactsContextType } from "../types/contactDataType";
import {
  contactInitialState,
  ContactsContext,
} from "../contexts/ContactsContext";
import { usersFormData } from "../data/formData";
import { FormProvider } from "react-hook-form";

interface DataType {
  setOpenModal: (_: boolean) => void;
}

const FormModal: React.FC<DataType> = ({ setOpenModal }) => {
  const handleFormSubmit = async (data: ContactDataType) => {
    try {
      isEditing
        ? updateContact(data as ContactDataType)
        : addContact(data as ContactDataType);
      setOpenModal(false);
      setIsEditing(false);
      setCurrentContact(contactInitialState);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    addContact,
    updateContact,
    isEditing,
    setIsEditing,
    currentContact,
    setCurrentContact,
    methods,
  } = useContext(ContactsContext) as ContactsContextType;
  const clickRef = useOutsideClick(() => {
    setOpenModal(false);
  });

  return (
    <div
      ref={clickRef}
      className={`rounded-md fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[#d6bdf6] w-[97vw] md:w-[90vw] 2xl:w-[60vw] min-h-[20rem] p-4 md:p-8 z-10`}
    >
      <div className="relative">
        <h4 className="text-2xl font-semibold text-center">Fill the details</h4>
        <ImCross
          onClick={() => setOpenModal(false)}
          className="absolute top-2 right-0 cursor-pointer"
        />
        <hr className="h-[1px] bg-white my-4" />
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="mt-8 flex flex-col gap-8"
        >
          {usersFormData.map((data) => (
            <InputComponent key={data.name} inputProps={data} />
          ))}

          <div className="grid grid-cols-[6rem_auto] gap-4 items-center">
            Role:
            <SelectComponent
              name="role"
              options={Object.values(RoleEnum).filter(
                (role) => role !== RoleEnum.ALL,
              )}
              defaultValue={isEditing ? currentContact.role : "Select Role"}
              customClasses="rounded-md"
            />
          </div>
          <button className="rounded-md px-8 ms-auto py-1.5 w-fit bg-[#9b5de5] hover:bg-black hover:text-white">
            {isEditing ? "UPDATE" : "ADD"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default FormModal;
