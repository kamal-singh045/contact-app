interface DataType {
    id: string;
    label: string;
    placeholder: string;
    error?: string;
    type: string;
    [key: string]: any;
}

const InputComponent: React.FC<DataType> = ({ handleForm, id, label, type, placeholder, error, ...props }) => {
    return (
        <label className="grid grid-cols-[6rem_auto] gap-4 items-center relative">
            <span>{label}:</span>
            <input onChange={(e) => handleForm(e.currentTarget.id, e.currentTarget.value)} id={id} type={type} placeholder={placeholder} {...props} className="w-full outline-slate-200 px-3 py-2 rounded-md" />
            {error && <span className="text-red-600 text-sm absolute top-9 left-28">{error}</span> }
        </label>
    )
}
export default InputComponent;