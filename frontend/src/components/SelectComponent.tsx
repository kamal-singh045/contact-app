interface DataType {
    changeHandler: (_: string, __: string) => void;
    options: string[];
    defaultValue: string;
    id: string;
    customClasses: string;
}

const SelectComponent: React.FC<DataType> = ({ changeHandler, options, id, defaultValue, customClasses }) => {
    return (
        <select onChange={(e) => changeHandler(e.currentTarget.id, e.currentTarget.value)} id={id} className={`shrink-0 px-3 py-2 cursor-pointer focus:outline-none ${customClasses}`}>
            <option value={defaultValue} defaultValue={defaultValue} hidden>{defaultValue}</option>
            {options.map((op) => <option key={op} value={op}>{op}</option>)}
        </select>
    )
}

export default SelectComponent;