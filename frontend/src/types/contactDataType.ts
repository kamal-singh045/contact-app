export interface ContactDataType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  role: string;
  address: string;
  joiningDate: string;
  salary: string;
}

export interface ContactsContextType {
  contacts: ContactDataType[];
  addContact: (user: ContactDataType) => void;
  updateContact: (user: ContactDataType) => void;
  deleteContact: (id: string) => void;
  setSearchFilter: (search: string) => void;
  setRoleFilter: (role: string) => void;
  isEditing: boolean;
  setIsEditing: (_: boolean) => void;
  currentContact: ContactDataType;
  setCurrentContact: (user: ContactDataType) => void;
  openModal: boolean;
  setOpenModal: (_: boolean) => void;
  totalContacts: number;
  setPageLimit: (_: number) => void;
  pageLimit: number;
  setCurrentPage: (_: number) => void;
  currentPage: number;
  methods: any;
}
