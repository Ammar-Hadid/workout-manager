import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FormSelect = ({ options = [], placeholder, className = "", ...props }) => {
    const inputClassList = `border-2 border-black p-2 focus:outline-0 text-black text-[18px]`;

    return (
        <div className="relative">
            <FontAwesomeIcon icon={faChevronDown} className="absolute top-1/2 -translate-y-1/2 right-4" />
            <select
                {...props}
                className={`${inputClassList} w-full appearance-none ${className}`}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}

                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormSelect;
