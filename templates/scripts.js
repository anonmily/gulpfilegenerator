{% if 'react' in config and 'js' in config %}
gulp.task('scripts', ['js'], function() {
    return gulp.src({% for source in config['react']['sources'] %}"{{ source }}"{% if not loop.last %},
        {% endif %}{%endfor%}{% for source in config['js']['sources'] %},"{{ source }}"{%endfor%})
        .pipe(concat( {{ destination.file }} ))
        .on('error', util.log)
        .pipe(gulp.dest( destination.directory ))
        .pipe(reload({
            stream: true
        }));
});
{% elif 'js' in config %}
gulp.task('scripts', ['js'], function() {
    return gulp.src({{ config['js']['destination']['directory'] }}/{{ config['js']['destination']['file'] }})
        .pipe(concat( {{ destination.file }} ))
        .on('error', util.log)
        .pipe(gulp.dest( destination.directory ))
        .pipe(reload({
            stream: true
        }));
});
{%endif%}