const placement = {
    from: "bottom",
    align: "center"
}

export default {

    info: (message) => $.notify({
        message: message
    }, {
            type: 'info',
            placement
        }),

    error: (message) => $.notify({
        message: message
    }, {
            type: 'danger',
            placement
        }),

    success: (message) => $.notify({
        message: message
    }, {
            type: 'success',
            placement
        }),

    native: (title, message) => cordova.plugins.notification.local.schedule({
        id: 1,
        title: title,
        text: message,
    })
}