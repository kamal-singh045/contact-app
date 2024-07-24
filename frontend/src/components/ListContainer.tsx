import SingleUser from "./SingleUser";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { UserContextType } from "../types/userDataType";

const ListContainer = () => {
    const { users } = useContext(UserContext) as UserContextType;

    return (
        <div className="flex flex-col gap-3 p-4">
            {users.map(user => <SingleUser key={user.email} user={user} />)}
        </div>
    )
}

export default ListContainer;