import { useFormContext } from "react-hook-form";

interface DataType {
    options: string[];
    defaultValue: string;
    name: string;
    customClasses: string;
}

const SelectComponent: React.FC<DataType> = ({ options, name, defaultValue, customClasses }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="relative">
            <select {...register(name)} className={`shrink-0 w-full px-3 py-2 cursor-pointer focus:outline-none ${customClasses} `}>
                <option value={defaultValue} defaultValue={defaultValue} hidden>{defaultValue}</option>
                {options.map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
            {<span className="text-red-600 absolute top-9 left-0 text-sm">{errors[name]?.message as string}</span>}
        </div>
    )
}

export default SelectComponent;