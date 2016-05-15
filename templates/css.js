gulp.task('css', function() {
    return gulp.src([
        	{% for source in sources %}"{{ source }}"{% if not loop.last %},
        	{% endif %}{%endfor%}
        ])
        .pipe(concat('{{ destination.file }}'))
        .pipe(gulp.dest('{{ destination.directory }}'))
        .pipe(reload({
            stream: true
        }));
});