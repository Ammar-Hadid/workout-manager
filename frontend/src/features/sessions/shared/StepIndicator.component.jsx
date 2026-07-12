const StepIndicator = ({ variant, step }) => {
    if (!step) return null;

    const stepStyles = {
        compact: 'bg-surface w-md h-md text-text-primary',
        featured: 'bg-bg-accent-surface w-3xl h-3xl text-primary text-h3'
    }

    return (
        <div className={`flex items-center justify-center p-md rounded-full ${stepStyles?.[variant] ?? stepStyles.compact}`}>
            {step}
        </div>
    )
}

export default StepIndicator;