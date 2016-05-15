gulp.task("eslint",function(){
    return gulp.src([
    	{% for source in sources %}"{{ source }}"{% if not loop.last %},
    	{% endif %}{%endfor%}
    ]).pipe(eslint({config: ".eslintrc"}))
        .pipe(eslint.format());
});