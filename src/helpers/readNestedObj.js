const changeFormat = (str) => {
    return str.split('.').reduce((acc, curr) => acc + `['${curr}']?.`, '');
};

export default changeFormat;
