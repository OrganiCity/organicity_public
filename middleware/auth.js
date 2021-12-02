export default function ({ app, store, redirect, route }) {
    const restrictedRoutes = [
    ]
    const restrictedPaths = [
        "account"
    ]
    const adminOnlyPaths = [
        "admin"
    ]
    return app.$api("userMe")
        .then(({ data }) => {
            store.commit("auth/setUserInfo", data)
            if (!data.isAdmin && adminOnlyPaths.some(e => route.path.startsWith(`/${e}`))) redirect("/");
        })
        .catch((e) => {
            store.commit("auth/setLoggedIn", false)
            store.commit("auth/setUserInfo", null)
            store.commit("auth/setUserToken", null)
            if (adminOnlyPaths.some(e => route.path.startsWith(`/${e}`)))
                redirect("/");
            if (restrictedRoutes.includes(route.name) || restrictedPaths.some(e => route.path.startsWith(`/${e}`)))
                redirect("/");
        })
}