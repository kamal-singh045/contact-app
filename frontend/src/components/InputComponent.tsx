interface DataType {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    [key: string]: any;
}

const InputComponent: React.FC<DataType> = ({ handleForm, id, label, type, placeholder, ...props }) => {
    return (
        <label className="grid grid-cols-[6rem_auto] gap-4 items-center">
            <span>{label}:</span>
            <input onChange={(e) => handleForm(e.currentTarget.id, e.currentTarget.value)} id={id} type={type} placeholder={placeholder} {...props} className="w-full outline-slate-200 px-3 py-1.5 rounded-md" />
        </label>
    )
}
export default InputComponent;