gulp.task('watch', function() {
	{% for watching in watch %}
    gulp.watch( [
    	{% for file in watching.files %}"{{ file }}"{% if not loop.last %},
    	{% endif %}{%endfor%}
    ],[{% for action in watching.actions %}"{{ action }}"{% if not loop.last %},{% endif %}{%endfor%}]);
    {% endfor %}
});