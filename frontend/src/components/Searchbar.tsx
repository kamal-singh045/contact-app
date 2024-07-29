// import { useCallback } from "react";
import { useContext, useRef } from "react";
import { ContactsContext } from "../contexts/ContactsContext";
import { ContactsContextType } from "../types/contactDataType";

const Searchbar = () => {
  const { setSearchFilter } = useContext(
    ContactsContext,
  ) as ContactsContextType;
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentValue = useRef<HTMLInputElement>(null);

  const debounce = (delay: number) => {
    return function () {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        currentValue.current &&
          currentValue.current.value.trim() &&
          setSearchFilter(currentValue.current.value.trim());
        debounceTimeout.current = null;
      }, delay);
    };
  };

  const debouncedSearchHandler = debounce(500);
  return (
    <div className="flex-1">
      <input
        ref={currentValue}
        onChange={debouncedSearchHandler}
        type="search"
        placeholder="Search here..."
        className="rounded-full w-[50%] px-3 py-2 border border-black focus:outline-none"
      />
    </div>
  );
};

export default Searchbar;
