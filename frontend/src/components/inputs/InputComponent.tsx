import { useFormContext } from "react-hook-form";

interface DataType {
    label: string;
    type?: string | undefined;
    name: string;
}

const InputComponent = ({ inputProps }: { inputProps: DataType }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <label className="grid grid-cols-[6rem_auto] gap-4 items-center relative">
            <span>{inputProps.label}:</span>
            <input
                {...inputProps}
                {...register(inputProps.name)}
                placeholder={`Enter ${inputProps.label}`}
                className="w-full outline-slate-200 px-3 py-2 rounded-md"
            />
            {<span className="text-red-600 text-sm absolute top-10 left-28">{errors[inputProps?.name]?.message as string}</span>}
        </label>
    )
}
export default InputComponent;
