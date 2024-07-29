import { createContext, useState, useEffect } from "react";
import { ContactDataType, ContactsContextType } from "../types/contactDataType";
import { AxiosClient } from "../helpers/customAxios";
import { PageLimitEnum } from "../enums/pageLimit";
import { RoleEnum } from "../enums/roleEnum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactSchema from "../validators/contactValidation";
import HotToast from "../helpers/hotToast";

const notify = (type: string, message: string) => HotToast(type, message);

export const ContactsContext = createContext<ContactsContextType | null>(null);
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
  salary: "",
};

const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<ContactDataType[]>([]);
  const [currentContact, setCurrentContact] =
    useState<ContactDataType>(contactInitialState);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [pageLimit, setPageLimit] = useState<number>(
    Number(PageLimitEnum.ONE.split(" ")[0]),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roleFilter, setRoleFilter] = useState<string>(RoleEnum.ALL);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [totalContacts, setTotalContacts] = useState<number>(0);

  const methods = useForm<ContactDataType>({
    resolver: zodResolver(ContactSchema),
  });

  useEffect(() => {
    async function fetchData() {
      const response = await AxiosClient.get(
        `/get-all-contacts/?role=${roleFilter}&search=${searchFilter}&&current=${currentPage}&limit=${pageLimit}`,
      );
      if (response.status) {
        setContacts(response.data.data);
        setTotalContacts(response.data.totalCount);
      }
    }
    fetchData();
  }, [currentPage, pageLimit, roleFilter, searchFilter]);

  const addContact = async (contact: ContactDataType) => {
    const response = await AxiosClient.post("/add-contact", { ...contact });
    if (response.status) {
      setContacts([...contacts, contact]);
      notify("success", "Contact Added Successfully!");
    } else notify("error", "Contact can't be added!");
  };

  const updateContact = async (contact: ContactDataType) => {
    const response = await AxiosClient.put(`/update-contact`, { ...contact });
    if (response.status) {
      setContacts(
        [...contacts].map((ele) => {
          if (ele._id === contact._id) return contact;
          else return ele;
        }),
      );
      notify("success", "Contact Updated Successfully!");
    } else notify("error", "Contact can't be updated!");
  };

  const deleteContact = async (id: string) => {
    const response = await AxiosClient.delete(`delete-contact/?id=${id}`);
    if (response.status) {
      setContacts([...contacts].filter((ele) => ele._id !== id));
      notify("success", "Contact Deleted Successfully!");
    } else notify("error", "Contact can't be deleted!");
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        setRoleFilter,
        setSearchFilter,
        isEditing,
        setIsEditing,
        currentContact,
        setCurrentContact,
        openModal,
        setOpenModal,
        totalContacts,
        pageLimit,
        setPageLimit,
        currentPage,
        setCurrentPage,
        methods,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
export default UsersProvider;
