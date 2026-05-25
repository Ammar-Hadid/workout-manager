const FormInput = ({ className = "", ...props }) => {
    const inputClassList = `border-2 border-black p-2 focus:outline-0 text-black text-[18px]`;

    return (
        <input
            {...props}
            className={`${inputClassList} ${className}`}
        />
    )
}

export default FormInput;
