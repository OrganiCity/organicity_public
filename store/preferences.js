export const state = () => ({
    darkTheme: false,
    language: 'TR',
})

export const mutations = {
    setDarkTheme(state, payload) { state.darkTheme = payload },
    setLanguage(state, payload) { state.language = payload }
}

export const getters = {
    darkTheme: (state) => state.darkTheme,
    language: (state) => state.language
}