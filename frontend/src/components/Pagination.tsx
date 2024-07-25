import SelectComponent from "./SelectComponent";
import { PageLimitEnum } from "../enums/pageLimit";
import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";
import { ContactsContext } from "../contexts/ContactsContext";
import { ContactsContextType } from "../types/contactDataType";
import { useContext } from "react";

const Pagination = () => {
	const { totalContacts, setPageLimit, pageLimit, currentPage, setCurrentPage } = useContext(ContactsContext) as ContactsContextType;

	const totalPages = Math.floor(totalContacts/pageLimit+1);
	const startValue = (currentPage-1)*pageLimit+1;
	const lastValue = (currentPage-1)*pageLimit + pageLimit > totalContacts ? totalContacts : (currentPage-1)*pageLimit + pageLimit;

	const pageLimitChangeHandler = (_: string, value: string) => {
		setPageLimit(Number(value.split(' ')[0]));
		setCurrentPage(1);
	}

	const handleLeftClick = () => {
		setCurrentPage(currentPage-1);
	}
	const handleRightClick = () => {
		setCurrentPage(currentPage+1);
	}

	return (
		<div className="flex justify-between p-4">
			<SelectComponent changeHandler={pageLimitChangeHandler} options={Object.values(PageLimitEnum)} id="pageLimit" defaultValue={PageLimitEnum.ONE} customClasses="rounded-sm" />
			<div className="text-white flex items-center gap-2 sm:gap-4 2xl:text-xl">
				<button onClick={handleLeftClick} className={`border border-black p-2 rounded-sm sm:min-w-12 flex justify-center items-center ${currentPage <= 1 && "bg-[#415a77]"}`} disabled={currentPage <= 1}> <RiArrowLeftSFill className="text-2xl" /> </button>

				<p>{startValue + " - " + lastValue + " of " + totalContacts}</p>

				<button onClick={handleRightClick} className={`border border-black p-2 rounded-sm sm:min-w-12 flex justify-center items-center ${currentPage >= totalPages && "bg-[#415a77]"}`} disabled={currentPage >= totalPages}> <RiArrowRightSFill className="text-2xl" /> </button>
			</div>
		</div>
	)
}

export default Pagination;