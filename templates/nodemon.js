gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: '{{ script }}',
        ext: 'js',
        ignore: [{% for file in ignore %}"{{file}}"{% if not loop.last %},
        {% endif %}{%endfor%}]
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true; 
        } 
    });
});