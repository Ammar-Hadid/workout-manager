const FormInput = ({ className = "", ...props }) => {
    const inputClassList = `w-full rounded-pill border border-text-secondary/30 bg-bg-primary px-md py-sm text-body text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20`;

    return (
        <input
            {...props}
            className={`${inputClassList} ${className}`}
        />
    )
}

export default FormInput;
