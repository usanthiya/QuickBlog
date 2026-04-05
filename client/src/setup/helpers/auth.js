export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
}

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const setUserInLocalStorage = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

export const unsetUserInLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}