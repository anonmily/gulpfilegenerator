// uses the typings package to manage Typescript type declarations
var ts_project = typescript.createProject('{{ currdir }}/tsconfig.json');
gulp.task('typescript', function(cb) {
    return gulp.src([
        {% for source in sources %}"{{ source }}"{% if not loop.last %},
        {% endif %}{%endfor%}
    ])
        .pipe(plumber())
        .pipe( inject(gulp.src(['./typings/index.d.ts'], {read: true}), {
            starttag: '//typings',
            endtag: '//',
            transform: function(filepath, file, i, length){
                var filepath = __filename.split(path.sep)
                filepath.pop()
                filepath = filepath.join('/')
                return '/// <reference path="' + filepath + '/typings/index.d.ts" />'
            },
            removeTags: true,

        }))
        .on('error', handleError('Typescript Gulp Inject Error'))
        .pipe( sourcemaps.init() )
        .pipe( typescript(ts_project) )
        .pipe( sourcemaps.write('.') )
        .pipe(rename( function(path){
            if(path.extname == '.jsx'){
                console.log(path)
                path.extname = '.js'
            }
            if(path.extname == '.map'){
                path.basename = path.basename.replace('.jsx','.js')
            }
            return path
        }))
        .on('error', handleError('Typescript Error'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('{{ destination.directory }}'))
});