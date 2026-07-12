import SectionHeading from "./SectionHeading";

export const Card = ({ children, heading = '' }) => {
    return (
        <div>
            {heading && <SectionHeading heading={heading} />}
            {children}
        </div>
    )
}

export default Card;