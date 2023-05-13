const getStore = () => {
    const store = JSON.parse(localStorage.getItem('activeStore'))
    return store
}

export default getStore