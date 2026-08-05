const BodyPaths = ({ paths, name, pathTransforms = [] }) => (
    <>
        {paths.map((path, index) => (
            <path
                key={`${name}-${index}`}
                d={path}
                transform={pathTransforms[index]}
            />
        ))}
    </>
);

export default BodyPaths;
