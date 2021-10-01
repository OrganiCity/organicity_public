export default function ({ store, $vuetify }) {
    $vuetify.theme.dark = store.getters['preferences/darkTheme']
    $vuetify.lang.current = store.getters['preferences/language'].toLowerCase()
}