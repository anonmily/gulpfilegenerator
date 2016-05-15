function handleError(name) {
    return function(err) {
        console.log(err.toString())
        notifier.notify({
            'title': "{{ app_name }}: " + name,
            'message': err
        });
        beep();
        this.emit("end");
    }
}
