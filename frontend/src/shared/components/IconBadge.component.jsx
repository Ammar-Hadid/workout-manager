const IconBadge = ({
    icon: Icon,
    className = "",
    iconClassName = "",
    strokeWidth = 1,
}) => (
    <div
        className={`
            flex items-center justify-center
            border border-primary/25
            bg-bg-accent-surface text-primary rounded-xl
            ${className}
        `}
    >
        <Icon
            className={iconClassName}
            strokeWidth={strokeWidth}
            aria-hidden="true"
        />
    </div>
);

export default IconBadge;