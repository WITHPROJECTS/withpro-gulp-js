const path        = require('path');
const gulp        = require('gulp');          //
// const sass        = require('gulp-sass');     // Sass
// const plumber     = require('gulp-plumber');  // 
// const pleeease    = require('gulp-pleeease'); // 
// const cached      = require('gulp-cached');   // キャッシュ
const gulpIf      = require('gulp-if');       // if文
// const gulpForEach = require('gulp-foreach');  // forEach文
// const grapher     = require('sass-graph');    // 

let tasks = {};

// 
// CONCAT
// =============================================================================
tasks['concat'] = {
    'task' : function( done ) {
    }
}

// =============================================================================
// JSのコンパイル
// 
tasks['build:js'] = {
    'task' : function( done ) {
        let status = this.status;
        status.mainTaskID = 'build:js';

        let useConcat = this.options.concat.use;
        let _path      = this.getPath('input', 'js');
        console.log(this);
        
        // concatがない場合の処理
        if( !useConcat ) {
            gulp
                .src( path.join( this.getPath('input', 'js'), `**/*.${this.ext.js}` ) );
        }
        
    }
}


// =============================================================================
// JSファイルの監視
// 
tasks['watch:js'] = {
    'task' : function( done ) {
        let status = this.status;
        status.mainTaskID = 'watch:js';
        status.isWatching = true;
    }
}


module.exports = tasks;
