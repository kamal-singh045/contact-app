export interface UserDataType {
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

export interface UserContextType {
    users: UserDataType[];
    addUser: (user: UserDataType) => void;
    updateUser: (user: UserDataType) => void;
    deleteUser: (id: string) => void;
    filterUsers: (role: string) => void;
    isEditing: boolean;
    setIsEditing: (_: boolean) => void;
    currentUser: UserDataType;
    setCurrentUser: (user: UserDataType) => void;
    openModal: boolean;
    setOpenModal: (_: boolean) => void;
}