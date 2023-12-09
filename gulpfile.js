var gulp = require('gulp'),                     // base
    sass = require('gulp-sass')(require('sass')),                // processes scss files
    concat = require('gulp-concat'),            // to merge files
    del = require('del'),                       // deletes old dist files
    connect = require('gulp-connect'),          // creates a local server
    open = require('gulp-open'),                // to open a browser istance
    // addsrc = require('gulp-add-src'),           // useful to add some css/js in the bundle
    twig     = require('gulp-twig'),
    data     = require('gulp-data'),
    cleanCSS = require('gulp-clean-css'),       // minifies css files
    // uglify   = require('gulp-uglify'),          // minifies js files    
    // gulpif   = require('gulp-if'),              // conditions in pipe
    fs       = require('fs'),                   
    // file     = require('gulp-file'),            // creates a new file

    bump = require('gulp-bump'),
    git  = require('gulp-git'),
    filter = require('gulp-filter'),
    argv = require('yargs')
        .option('type', {
            alias: 't',
            choices: ['patch', 'minor', 'major']
        }).argv,
    tag = require('gulp-tag-version'),
    push = require('gulp-git-push'),
    inject   = require('gulp-inject-partials');// injects a text in a file (used for ATF injection)


var debug = true;

var version          = '';
var current_version  = '';  

var buildFolder = 'dist/',
    cssBuildFolder, scriptsBuildFolder, assetsBuildFolder, viewsBuildFolder;

const setFolders = (folder = 'static/') => {
    buildFolder = folder;
    cssBuildFolder     = buildFolder + 'styles/';
    scriptsBuildFolder = buildFolder + 'scripts/';
    assetsBuildFolder  = buildFolder + 'assets/';
    viewsBuildFolder   = buildFolder + 'views/';
}

setFolders(buildFolder);

// task to delete each file in the dist directory
gulp.task('clean', () => del([cssBuildFolder, scriptsBuildFolder, assetsBuildFolder, buildFolder ]));

// does nothing but set the debug variable
gulp.task('prod', () => { debug = false; return gulp.src('src/'); } );

var getPackageJson = function () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};


// task to compile SASS scripts,
// create the css files and reload the page
gulp.task('sass', () =>
    gulp.src('src/styles/**/*.scss')
    .pipe(sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
        precision: 9
    }).on('error', sass.logError))
    .pipe(cleanCSS({debug: true}, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    }))

    .pipe(gulp.dest(cssBuildFolder))
    .pipe(connect.reload())
);


gulp.task('styles:lib', () =>{

    const libs_src = [
        'src/styles/lib/*.css'        
    ];

    return gulp.src(libs_src)
    .pipe(concat('main-libs.css'))
    .pipe(gulp.dest(cssBuildFolder+'/lib'))
    .pipe(connect.reload());
});

gulp.task('scripts:lib', () =>{

    const libs_src = [
        'src/scripts/lib/*.js'        
    ];

    return gulp.src(libs_src)
    .pipe(concat('main-libs.js'))
    .pipe(gulp.dest(scriptsBuildFolder+'/lib'))
    .pipe(connect.reload());
});

gulp.task('scripts_lib', () =>{
    return gulp.src('src/scripts/lib/*.js')
        .pipe(gulp.dest(scriptsBuildFolder+'/lib'))
        .pipe(connect.reload());
});

gulp.task('mainjs', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest(scriptsBuildFolder))
        .pipe(connect.reload());
});


gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(buildFolder))
        .pipe(connect.reload());
});

gulp.task('assets', function() {
    return gulp.src(['src/assets/**/*'])
        .pipe(gulp.dest(assetsBuildFolder));
});


// Compile Twig templates to HTML
gulp.task('templates', function() {

    console.log('task-templates buildfolder : ', buildFolder );

    return gulp.src('src/**/*.twig') // run the Twig template parser on all .html files in the "src" directory
        //.pipe(twig('twig_data.json'))  

        // each twig templates has a json that contains 
        // its own sample data
        .pipe(data(function (file) {
            
            let hasBackslashes = (file.path.indexOf('\\') != -1); 
            let filepath = file.path.replace(/\\/g,"/").split('/');
            let filename = filepath[ filepath.length-1 ];            

            filepath[ filepath.length - 1 ] = 'data/'+filename+'.json';
            jsonpath = filepath.join('/');
            if (hasBackslashes) jsonpath =  jsonpath.replace(/\//g,"\\");
            
            let data = {};
            if (fs.existsSync(jsonpath))                 
                data = JSON.parse(fs.readFileSync(jsonpath));    
            return data;                
        }))
        .pipe( twig({ base: __dirname + '/src/' }) )
        
        .pipe( inject({ start: '/**--{{path}}--', end: '*/',  removeTags: true, prefix : `${__dirname}/${buildFolder}styles/atf/` } ) )

        .pipe( gulp.dest(buildFolder) ) // output the rendered HTML files to the "dist" directory
        .pipe(connect.reload());

});


// Export Twig templates
gulp.task('views', function() {

    console.log('views into : ', viewsBuildFolder );

    return gulp.src('src/**/*.twig') // run the Twig template parser on all .html files in the "src" directory

        .pipe( inject({ start: '/**--{{path}}--', end: '*/',  removeTags: true, prefix : `${__dirname}/${buildFolder}styles/atf/` } ) )
        
        // copy rendered twig files to the "dist" directory
        .pipe( gulp.dest(viewsBuildFolder) ) 
        .pipe(connect.reload());

});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.scss', gulp.series('sass', 'templates'));
    gulp.watch('src/scripts/**/*.js', gulp.series('mainjs', 'templates'));    
    gulp.watch('src/assets/**/*', gulp.series('assets'));
    gulp.watch('src/**/*.twig', gulp.series('templates'));
    gulp.watch('src/data/**/*.json', gulp.series('templates'));
});


gulp.task('connect', function() {
    connect.server({
        root: buildFolder,
        port: 8886,
        livereload: true
    });
});

gulp.task('browser', function(){
    gulp.src(buildFolder + 'index.html')
        .pipe(open({uri: 'http://localhost:8886'}));
});


var getPackageJson = function () {
    return JSON.parse( fs.readFileSync('./package.json', 'utf8'));
};


/** 
 * Imposta le variabili di versione attuali leggendole dal package-json
 */
 gulp.task('version', () => { 

    const pkg = getPackageJson();
    version         = pkg.version;
    current_version = pkg.version.replace(/\./g,'_');  // serve trasformare i punti in underscore per l'injection;
    
    return gulp.src('src/');
} );


/**
 * Modifica la versione del progetto
 * prende l'opzione -t per stabilire il tipo di avanzamento 
 * 'patch' ( default ), 'minor', 'major'
 */
gulp.task( 'bump', function () {

    return gulp.src('package.json')
           .pipe( bump( { type: argv.type || 'patch' }) )
           .pipe( gulp.dest('./') );
           
});

/**
 * aggiunge i nuovi file elaborati con git add
 * e poi fa il commit utilizzando la nuova versione
 */
gulp.task( 'commit', function() {

    return gulp.src( [ buildFolder + '*', 'package.json' ] )
        .pipe( git.add({args: '-f'}) ) // Run git add
        .pipe( git.commit( `Bump to version ${ version }` ))        
        .pipe( filter('package.json')) // filtra il solo package.json        
        .pipe( tag() )                 // così tag prende solo la versione del package.json
        .pipe( push({                      
            repository: 'origin',
            refspec: 'HEAD'
        }) );
}.bind( this ) );


gulp.task('common-chain', 
    gulp.series('clean', 'assets', 'sass', 'scripts_lib', 'mainjs', 'views',
        gulp.parallel('scripts:lib', 'styles:lib', 'html'),
    )
);

gulp.task('default',
    gulp.series( 'common-chain', 'templates', gulp.parallel('connect','watch','browser') )
);

gulp.task('build', gulp.series('common-chain' ));

// updates version and saves file in the /static folder
gulp.task('build-bump',  gulp.series('bump', 'version', 'common-chain', 'commit'));

// updates version and saves file in the /static folder, removes console logs and minifies CSS and JS
gulp.task('build-prod',  gulp.series('bump', 'version', 'prod', 'common-chain', 'commit'));