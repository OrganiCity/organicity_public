import translations from "~/translations"

export default function ({ store }, inject) {
    function i18n(keyword) {
        if (translations[store.getters['preferences/language']] !== undefined)
            return translations[store.getters['preferences/language']][keyword] || 'no-translation-error'
        else return 'no-translation-error'
    }
    inject('i18n', i18n)
}