gulp.task('js', function() {
    return gulp.src([
            {% for source in sources %}"{{ source }}"{% if not loop.last %},
        {% endif %}{%endfor%}
        ])
        .pipe(concat('frontend.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest( dest.dir.js ));
});

gulp.task('reloadjs', function() {
    return gulp.src(['{{ destination.directory }}/**.js'])
        .pipe(reload({
            stream: true
        }));
});