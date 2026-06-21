const CardsWrapper = ({ children }) => {
    return (
        <div className={`
        relative grid grid-cols-1 gap-xl
        rounded-card bg-bg-surface p-lg text-text-primary
        md:grid-cols-2 md:p-xl xl:grid-cols-3 xl:gap-3xl`
        }>
            {children}
        </div>
    )
}

export default CardsWrapper;