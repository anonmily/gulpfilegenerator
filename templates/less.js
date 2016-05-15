gulp.task('less', function() {

    gulp.src([
        {% for source in sources %}"{{ source }}"{% if not loop.last %},
    {% endif %}{%endfor%}
    ])
    .pipe(plumber())
    .pipe(less())
    .on('error', handleError('LESS Error'))
    .pipe(autoprefixer({
        browsers: [{% for browser in autoprefix.browsers %}"{{ browser }}"{% if not loop.last %},{% endif %}{%endfor%}],
        cascade: {{ autoprefix.cascade | lower }}
    }))
    .pipe(plumber.stop())
    .pipe(concat('{{ destination.file }}'))
    .pipe(gulp.dest('{{ destination.directory }}'))
    .pipe(reload({
        stream: true
    }))
}); 