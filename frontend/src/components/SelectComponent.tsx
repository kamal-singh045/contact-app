interface DataType {
    changeHandler: (_: string, __: string) => void;
    options: string[];
    defaultValue: string;
    id: string;
    customClasses: string;
    roleError?: string;
}

const SelectComponent: React.FC<DataType> = ({ changeHandler, options, id, defaultValue, customClasses, roleError }) => {
    return (
        <div className="relative">
            <select onChange={(e) => changeHandler(e.currentTarget.id, e.currentTarget.value)} id={id} className={`shrink-0 w-full px-3 py-2 cursor-pointer focus:outline-none ${customClasses}`}>
                <option value={defaultValue} defaultValue={defaultValue} hidden>{defaultValue}</option>
                {options.map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
            {roleError && <span className="text-red-600 absolute top-9 left-0 text-sm">{roleError}</span>}
        </div>
    )
}

export default SelectComponent;