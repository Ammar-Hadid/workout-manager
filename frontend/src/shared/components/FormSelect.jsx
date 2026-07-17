import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FormSelect = ({ options = [], placeholder, className = "", ...props }) => {
    const inputClassList = `rounded-pill border border-text-secondary/30 bg-bg-primary px-md py-sm text-body text-text-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20`;
    const groupedOptions = options.reduce((groups, option) => {
        if (!option.group) return groups;

        const groupOptions = groups.get(option.group) ?? [];
        groupOptions.push(option);
        groups.set(option.group, groupOptions);

        return groups;
    }, new Map());
    const hasGroupedOptions = groupedOptions.size > 0;

    const renderOption = option => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    );

    return (
        <div className="relative">
            <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-md top-1/2 -translate-y-1/2 text-text-secondary" />
            <select
                {...props}
                className={`${inputClassList} w-full appearance-none pr-2xl ${className}`}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}

                {hasGroupedOptions
                    ? Array.from(groupedOptions, ([group, groupOptions]) => (
                        <optgroup key={group} label={group}>
                            {groupOptions.map(renderOption)}
                        </optgroup>
                    ))
                    : options.map(renderOption)}
            </select>
        </div>
    )
}

export default FormSelect;
