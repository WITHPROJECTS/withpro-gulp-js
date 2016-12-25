let path           = require('path');
let notifier       = require('node-notifier');
let colors         = require('colors');
let gulp           = require('gulp');
let gulpBabel      = require('gulp-babel');
let gulpIf         = require('gulp-if');
let gulpChanged    = require('gulp-changed');
let gulpSourcemaps = require('gulp-sourcemaps');
let gulpPlumber    = require('gulp-plumber');
let gulpConcat     = require('gulp-concat');
let gulpIgnore     = require('gulp-ignore');
let runSequence    = require('run-sequence');
let isWatching     = false;
let isConcated     = false;

// /////////////////////////////////////////////////////////////////////////////
//
// SETTING
//
// /////////////////////////////////////////////////////////////////////////////
let conf = {
    'path' : {
        'project' : '/',
        'src' : {
            'js' : 'src/js'
        },
        'dest' : {
            'js' : 'build/js'
        }
    },
    'browsers' : ['last 3 version']
}

// /////////////////////////////////////////////////////////////////////////////
//
// OPTIONS
//
// /////////////////////////////////////////////////////////////////////////////
conf.options = { first : true }
// =============================================================================
// オプションの初期設定
// =============================================================================
let optionInit = ()=>{
    let ops   = conf.options;
    ops.first = false;
    // -------------------------------------------------------------------------
    // js
    // -------------------------------------------------------------------------
    ops['babel'] = ops['babel'] || {};
    let babelOps = ops['babel'];
    babelOps['minified'] = babelOps['minified'] !== undefined ? babelOps['minified'] : true;
    babelOps['comments'] = babelOps['comments'] !== undefined ? babelOps['comments'] : false;

    if(!babelOps['presets']){
        babelOps['presets'] = [
            ["env", {
                'loose'    : true,
                'modules'  : false,
                'browsers' : conf.browsers
            }]
        ];
    }
    // -------------------------------------------------------------------------
    // changed
    // -------------------------------------------------------------------------
    ops['changed'] = ops['changed'] || {};
    let changedOps = ops['changed'];
    changedOps['extension'] = changedOps['extension'] || '.js';
    // -------------------------------------------------------------------------
    // plumber
    // -------------------------------------------------------------------------
    ops['plumber'] = ops['plumber'] || {};
    let plumberOps = ops['plumber'];
    plumberOps['errorHandler'] = plumberOps['errorHandler'] || function(err){
        $relativePath = err.fileName;
        $relativePath = path.relative(process.cwd(), $relativePath);
        notifier.notify({
            'title'   : `JS ${err.name}`,
            'message' : `${err.name} : ${$relativePath}\n{ Line : ${err.loc.line}, Column : ${err.loc.column} }`,
            'sound'   : 'Pop'
        });
        console.log(`---------------------------------------------`.red.bold);
        console.log(`Line: ${err.loc.line}, Column: ${err.loc.column}`.red.bold);
        console.error(err.stack.red.bold);
        console.log(`---------------------------------------------`.red.bold);
        gulp.emit('end');
    };
}


// /////////////////////////////////////////////////////////////////////////////
//
// TASKS
//
// /////////////////////////////////////////////////////////////////////////////
conf.functions = {
    // =========================================================================
    'js-concat' : function(done){
        if(conf.options.first) optionInit();
        let ops      = conf.options;
        let num      = 0;
        let baseSrc  = conf.path.src.js;
        let baseDest = conf.path.dest.js;
        let list     = null;
        if(!conf.concat){
            done();
            return false;
        }
        num = Object.keys(conf.concat).length;
        if(!conf.concat){
            done();
            return false;
        }
        for(let key in conf.concat){
            list = [];
            for(let i = 0, l = conf.concat[key].length; i < l; i++){
                list.push(path.join(baseSrc, conf.concat[key][i]));
            }
            gulp.src(list)
                .pipe(gulpConcat(key))
                .pipe(gulp.dest(baseDest))
                .on('end', ()=>{
                    num--;
                    if(num === 0) done();
                });
        }
        return false;
    },
    // =========================================================================
    'js-build' : function(){
        return runSequence('js-concat', ()=>{
            if(conf.options.first) optionInit();
            let ops      = conf.options;
            let babelOps = ops.babel;
            let cache    = isWatching;
            let ignore   = '**/_*.js';
            let target   = path.join(conf.path.src.js, '**/*.js');
            let dest     = conf.path.dest.js;
            return gulp.src(target)
                .pipe(gulpIgnore(ignore))
                .pipe( gulpIf( cache, gulpChanged(dest, ops.changed) ) )
                .pipe(gulpPlumber(ops.plumber))
                .pipe(gulpSourcemaps.init())
                .pipe(gulpBabel(babelOps))
                .pipe(gulpSourcemaps.write('.'))
                .pipe(gulpPlumber.stop())
                .pipe(gulp.dest(dest));
        });
    },
    // =========================================================================
    'js-watch' : function(){
        if(conf.options.first) optionInit();
        isWatching = true;
        let target = path.join(conf.path.src.js, '**/*.js');
        gulp.watch(target, ['js-build']);
    }
}

module.exports = conf;
