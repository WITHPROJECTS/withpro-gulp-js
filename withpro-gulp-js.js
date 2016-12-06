let path       = require('path');
let gulp       = require('gulp');
let babel      = require('gulp-babel');
let watch      = require('gulp-watch');
let gulpIf     = require('gulp-if');
let notifier   = require('node-notifier');
let changed    = require('gulp-changed');
let sourcemaps = require('gulp-sourcemaps');
let plumber    = require('gulp-plumber');
let colors     = require('colors');
let concat     = require('gulp-concat');
let ignore     = require('gulp-ignore');
let remember   = require('gulp-remember');
let isWatching = false;

// /////////////////////////////////////////////////////////////////////////////
//
// 設定
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
    'browsers' : ['last 3 version'],
    'jsConcat' : {
        'hoge.js' : [
            'concat/_patial.js',
            'concat/_patial2.js'
        ],
        'fuga.js' : [
            'concat/_patial.js',
            'concat/_patial2.js'
        ]
    }
}


// /////////////////////////////////////////////////////////////////////////////
//
// オプション
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
    ops['js']          = ops['js'] || {};
    ops['js']['babel'] = ops['js']['babel'] || {};
    let babelOps = ops['js']['babel'];
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

// =============================================================================
// "_"から始まるファイルが変更された場合、結合リストを参照してファイルを結合する
// =============================================================================
let preConcat = (file)=>{
    let fileName = path.basename(file.path);
    let cwd      = process.cwd();
    let is       = /^_/.test(fileName);
    if(!is) return is;
    let relativePath = path.relative(cwd, file.path);
    relativePath = path.relative(conf.path.src.js, relativePath);
    for(let key in conf.jsConcat){
        let list = conf.jsConcat[key];
        let has  = false;
        for(let i = 0, l = list.length; i < l; i++){
            if(list[i] === relativePath){
                has = true;
                break;
            }
        }
        if(!has) continue;
        let newList = [];
        for(let i = 0, l = list.length; i < l; i++){
            newList.push(path.join(conf.path.src.js, list[i]));
        }
        gulp.src(newList)
            .pipe(concat(key))
            .pipe(gulp.dest(conf.path.src.js)).on('end', function(){
                conf.functions['js-build']('concat', key);
            }, 1);
    }
    return is;

};

conf.functions = {
    // =========================================================================
    'js-build' : function(){
        if(conf.options.first) optionInit();
        let ops      = conf.options;
        let babelOps = ops.js.babel;
        let target;
        let dest;
        let var1 = arguments['0'];
        let var2;
        if(var1 === 'concat'){
            var2   = arguments['1'];
            target = path.join(conf.path.src.js, var2);
        }else{
            target = path.join(conf.path.src.js, '**/*.js');
        }
        dest = conf.path.dest.js;
        return gulp.src(target)
            .pipe( gulpIf( isWatching, changed(dest, ops.changed) ) )
            .pipe( ignore.exclude(preConcat) )
            .pipe(plumber(ops.plumber))
            .pipe(sourcemaps.init())
            .pipe(babel(babelOps))
            .pipe(sourcemaps.write('.'))
            .pipe(plumber.stop())
            .pipe(gulp.dest(dest));
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
