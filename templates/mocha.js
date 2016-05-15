gulp.task('mocha', function() {
    return gulp.src({% for source in sources %}"{{ source }}"{% if not loop.last %},
    	{% endif %}{%endfor%})
        .pipe(mocha({ 
            reporter: 'nyan'{% if babel %},
            compilers: {
                js: babel
            }
            {% endif %}
        }))
});