const statusVariants = {
    "not-started": {
        label: "Not Started",
        className:
            "border-text-primary/25 bg-bg-surface-elevated text-text-secondary",
    },
    "in-progress": {
        label: "In Progress",
        className:
            "border-primary/30 bg-primary/10 text-primary",
    },
    completed: {
        label: "Completed",
        className:
            "border-success bg-success-200 text-success",
    },
    skipped: {
        label: "Skipped",
        className:
            "border-danger bg-danger-200 text-danger",
    },
};

const StatusBadge = ({ status }) => {
    const variant =
        statusVariants[status] ?? statusVariants["not-started"];

    return (
        <span
            className={`
                flex items-center
                rounded-lg border
                px-md py-sm
                text-body-sm font-medium
                whitespace-nowrap
                ${variant.className}
            `}
        >
            {variant.label}
        </span>
    );
};

export default StatusBadge;