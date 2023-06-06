const removeEmptyElements = (obj) => {
    if (Array.isArray(obj)) {
        obj.forEach((element, index) => obj.splice(index, 1, removeEmptyElements(element)));
        return obj;
    }
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([, v]) => (Array.isArray(v) ? v.length !== 0 : v !== null && v !== '' && v !== undefined))
            .map(([k, v]) => [k, v === Object(v) ? removeEmptyElements(v) : v])
    );
};
export default removeEmptyElements;
