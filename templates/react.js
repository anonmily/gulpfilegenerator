gulp.task('reactify', function(cb) {
    return gulp.src([
            {% for source in sources %}"{{ source }}"{% if not loop.last %},
            {% endif %}{%endfor%}
        ])
        .pipe(plumber())
        .pipe(tap(function(file) {
            var d = domain.create();
            d.on('error', handleError('Reactify Error'));
            d.run(function() {
                file.contents = browserify({
                        entries: [file.path]
                    })
                    .transform(babelify, { 
                        presets: ["es2015", "react"],
                        plugins: ["transform-class-properties"]
                    })
                    .bundle()
            });
        }))
        .on('error', handleError('Reactify Error'))
        .pipe(rename("{{ destination.file }}"))
        .pipe(plumber.stop())
        .pipe(gulp.dest( "{{ destination.directory }}" ))
});

gulp.task('react', ['reactify'], function(){
    return gulp.src([ "{{ destination.directory }}/**.js"])
        .pipe(reload({
            stream: true
        }));
})