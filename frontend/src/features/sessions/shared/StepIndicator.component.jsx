const StepIndicator = ({ variant, step }) => {
    if (!step) return null;

    const stepStyles = {
        compact: 'bg-surface w-sm h-sm text-text-primary bg-surface p-md md:p-lg bg-bg-surface border border-text-primary/50',
        featured: 'bg-bg-accent-surface w-3xl h-3xl text-primary text-h3'
    }

    return (
        <div className={`flex items-center justify-center rounded-full ${stepStyles?.[variant] ?? stepStyles.compact}`}>
            {step}
        </div>
    )
}

export default StepIndicator;