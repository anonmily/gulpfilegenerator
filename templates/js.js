gulp.task('js', function() {
    return gulp.src([
            {% for source in sources %}"{{ source }}"{% if not loop.last %},
        {% endif %}{%endfor%}
        ])
        .pipe(concat('{{ destination.file }}'))
        .on('error', util.log)
        .pipe(gulp.dest('{{ destination.directory }}'));
});

gulp.task('reloadjs', function() {
    return gulp.src(['{{ destination.directory }}/**.js'])
        .pipe(reload({
            stream: true
        }));
});