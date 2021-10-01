import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar-ng'

Vue.use(VuetifyToast, {
    x: 'center', // default
    y: 'bottom', // default
    color: 'info', // default
    icon: 'info',
    iconColor: '', // default
    classes: [
        'body-2'
    ],
    timeout: -1, // default
    dismissable: true, // default
    multiLine: false, // default
    vertical: false, // default
    queueable: true, // default
    showClose: true, // default
    closeText: '', // default
    closeIcon: 'close', // default
    closeColor: '', // default
    slot: [], //default
    shorts: {
        error: {
            color: 'error',
            icon: 'error'
        },
        success: {
            color: 'success',
            icon: 'check_circle'
        },
    },
    property: '$toast' // default
})
