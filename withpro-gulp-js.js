const path = require('path');

let TaskAssist = require('gulp-task-assist');
let taskAssist = new TaskAssist();

// サポートする拡張子
taskAssist.supportExt('js', 'js');

// デフォルトのパス
taskAssist
    .setPath( 'input', {
        'js' : ''
    })
    .setPath( 'output', {
        'js' : ''
    })

// オプションの設定
let ops = require( path.join( __dirname, 'asset/default-options' ) );
for(let key in ops) taskAssist.setOption( key, ops[key] );

// タスクの設定
let tasks = require( path.join( __dirname, 'asset/default-tasks' ) );
for(let key in tasks) taskAssist.setTask( key, tasks[key] );


// let path           = require('path');
// let notifier       = require('node-notifier');
// let colors         = require('colors');
// let gulp           = require('gulp');
// let gulpBabel      = require('gulp-babel');
// let gulpIf         = require('gulp-if');
// let gulpChanged    = require('gulp-changed');
// let gulpSourcemaps = require('gulp-sourcemaps');
// let gulpPlumber    = require('gulp-plumber');
// let gulpConcat     = require('gulp-concat');
// let gulpIgnore     = require('gulp-ignore');
// let runSequence    = require('run-sequence');
// let isWatching     = false;
// let conf           = {
//     'path'     : {},
//     'options'  : {},
//     'browsers' : ['last 3 version']
// };
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // PATH SETTING
// //
// // /////////////////////////////////////////////////////////////////////////////
// conf.path = {
//     'project' : '/',
//     'src'     : { 'js' : 'src/js' },
//     'dest'    : { 'js' : 'build/js' }
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // OPTIONS
// //
// // /////////////////////////////////////////////////////////////////////////////
// // =============================================================================
// // gulp-babel option
// // 
// conf.options.babel = {
//     'minified' : true,
//     'comments' : false,
//     'presets'  : [
//         ['env', {
//             'loose'    : true,
//             'modules'  : false,
//             'browsers' : conf.browsers
//         }]
//     ]
// };
// // =============================================================================
// // gulp-changed option
// // 
// conf.options.changed = {
//     'extension' : '.js'
// };
// // =============================================================================
// // gulp-plumber option
// // 
// conf.options.plumber = {
//     'errorHandler' : function(err){
//         let relativePath = err.fileName;
//         relativePath = path.relative(process.cwd(), relativePath);
//         notifier.notify({
//             'title'   : `JS ${err.name}`,
//             'message' : `${err.name} : ${relativePath}\n{ Line : ${err.loc.line}, Column : ${err.loc.column} }`,
//             'sound'   : 'Pop'
//         });
//         console.log(`---------------------------------------------`.red.bold);
//         console.log(`Line: ${err.loc.line}, Column: ${err.loc.column}`.red.bold);
//         console.error(err.stack.red.bold);
//         console.log(`---------------------------------------------`.red.bold);
//         gulp.emit('end');
//     }
// };
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // TASKS
// //
// // /////////////////////////////////////////////////////////////////////////////
// conf.functions = {
//     // =========================================================================
//     'js-concat' : function(done){
//         let ops      = conf.options;
//         let num      = 0;
//         let baseSrc  = conf.path.src.js;
//         let baseDest = conf.path.dest.js;
//         let list     = null;
//         if(!conf.concat){
//             done();
//             return false;
//         }
//         num = Object.keys(conf.concat).length;
//         if(!conf.concat){
//             done();
//             return false;
//         }
//         for(let key in conf.concat){
//             list = [];
//             for(let i = 0, l = conf.concat[key].length; i < l; i++){
//                 list.push(path.join(baseSrc, conf.concat[key][i]));
//             }
//             gulp.src(list)
//                 .pipe(gulpConcat(key))
//                 .pipe(gulp.dest(baseSrc))
//                 .on('end', ()=>{
//                     num--;
//                     if(num === 0) done();
//                 });
//         }
//         return false;
//     },
//     // =========================================================================
//     'js-build' : function(){
//         return runSequence('js-concat', ()=>{
//             let ops      = conf.options;
//             let babelOps = ops.babel;
//             let cache    = isWatching;
//             let ignore   = '**/_*.js';
//             let target   = path.join(conf.path.src.js, '**/*.js');
//             let dest     = conf.path.dest.js;
//             return gulp.src(target)
//                 .pipe(gulpIgnore(ignore))
//                 .pipe( gulpIf( cache, gulpChanged(dest, ops.changed) ) )
//                 .pipe(gulpPlumber(ops.plumber))
//                 .pipe(gulpSourcemaps.init())
//                 .pipe(gulpBabel(babelOps))
//                 .pipe(gulpSourcemaps.write('.'))
//                 .pipe(gulpPlumber.stop())
//                 .pipe(gulp.dest(dest));
//         });
//     },
//     // =========================================================================
//     'js-watch' : function(){
//         isWatching = true;
//         let target = path.join(conf.path.src.js, '**/*.js');
//         gulp.watch(target, ['js-build']);
//     }
// }
// 
// // /////////////////////////////////////////////////////////////////////////////
// //
// // INIT
// //
// // /////////////////////////////////////////////////////////////////////////////
// conf.init = function(){
//     let keys = Object.keys(conf.functions);
//     keys.forEach((key)=>{
//         let f = conf.functions;
//         if(Array.isArray(f[key])){
//             if(typeof f[key] === 'function'){
//                 gulp.task(key, f[key][0]);
//             }else{
//                 gulp.task(key, f[key][0], f[key][1]);
//             }
//         }else{
//             gulp.task(key, f[key]);
//         }
//     });
// }
// 
module.exports = taskAssist;
