gulp.task('browsersync',{% if nodemon %} ['nodemon'],{% endif %} function() {
    return browsersync.init(null, {
        proxy: "{{ proxy }}",
        files: [{% for file in files %}"{{file}}"{% if not loop.last %},
    	{% endif %}{%endfor%}],
        browser: "{{ browser }}",
        port: {{ port }},
    });
});
