const SectionHeading = ({ heading }) => {
    if (!heading) return null;

    return (
        <h2 className="m-0 text-body-sm font-semibold uppercase tracking-wider text-text-primary">
            {heading}
        </h2>
    );
}

export default SectionHeading;
