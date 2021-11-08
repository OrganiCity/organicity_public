export async function userLogin({ instance }, { email, password }) {
    return await instance.post("/auth/login", { email: email, password: password })
}

export async function userMe({ instance }) {
    return await instance.get("/auth/me")
}

export async function userRegister({ instance }, { email, password, firstName, lastName }) {
    return await instance.post("/auth/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
}