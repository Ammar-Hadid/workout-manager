const BodyPaths = ({ paths, name }) => (
    <>
        {paths.map((path, index) => (
            <path key={`${name}-${index}`} d={path} />
        ))}
    </>
);

export default BodyPaths;
