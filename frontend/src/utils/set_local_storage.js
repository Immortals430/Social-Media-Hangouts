export const setLocalStorage = (_id) => {
    const expiry = Date.now() + (2 * 24 * 60 * 60 * 1000)
    let object = {_id, expiry }
    localStorage.setItem('loggedUser', JSON.stringify(object))
}