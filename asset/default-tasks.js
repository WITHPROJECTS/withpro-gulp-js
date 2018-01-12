const path        = require('path');
const gulp        = require('gulp');            //
const plumber     = require('gulp-plumber');    // 
const babel       = require('gulp-babel');      // babel
const changed     = require('gulp-changed');    // 変更されたファイルのみ
const sourcemaps  = require('gulp-sourcemaps'); // ソースマップ
const concat      = require('gulp-concat');     // 結合
const _if         = require('gulp-if');         // if文
const tap         = require('gulp-tap');        //

let tasks = {};

// 
// JSファイルの結合
// =============================================================================
tasks['concat'] = {
    'task' : function( done ) {
        let status   = this.status;
        let ops      = this.options;
        let srcPath  = this.getPath('input', 'js');

        status.mainTaskID = 'concat';

        // 結合を利用しない設定の場合はなにもせず
        if ( !ops.concat.use ) {
            done();
        }
        else {
            let concated = []; // コンパイル済みのkeyが入る
            
            gulp
                .src([
                    path.join( srcPath, `**/_*.${this.ext.js}` ) // _から始まるファイルだけに絞り込む
                ])
                .pipe( changed(srcPath, ops.changed) ) // 変更ファイルのみに絞り込む
                .pipe( tap( function(file){
                    let list          = ops.concat.list; // 結合リスト
                    let isIncludeFile = false;
                    let hitKeys       = []; // 結合対象のキーが入る配列
                    let concatCount   = 0;
                    let _file         = file.relative.replace(/\.js$/, '');

                    // ストリームのファイルが結合リストに含まれているファイルかどうかを調べる
                    for( let key in list ) {
                        if ( list[key].includes(_file) && !hitKeys.includes(key) ) {
                            hitKeys.push(key);
                        }
                    }
                    // 末結合であれば結合処理を行う
                    for( let i = 0, l = hitKeys.length; i < l; i++ ) {
                        let key = hitKeys[i];
                        if ( concated.includes(key) ) continue;

                        concated.push(key);

                        let srcArr = list[key].map((v)=>{
                            return path.join( srcPath, `${v}.js` );
                        });
                        gulp
                            .src(srcArr)
                            .pipe( concat(`${key}.js`) )
                            .pipe( gulp.dest(srcPath) )
                            .on('end', (a)=>{
                                concatCount++;
                                if ( hitKeys.length === concatCount ){
                                    done();
                                }
                            });
                    }
                } ));
        } // end else
    }
}

// 
// JSのコンパイル
// =============================================================================
tasks['build:js'] = {
    'setFunc' : function( name, taskAssist ){
        gulp.task(
            name,
            gulp.series( 'concat', this.task.bind(taskAssist) )
        )
    },
    'task' : function( done ) {
        console.log('build task');
        let status        = this.status;
        let ops           = this.options;
        let useConcat     = ops.concat.use;
        let useSourcemaps = ops.sourcemaps.use;
        let srcPath       = this.getPath('input', 'js');
        let destPath      = this.getPath('output', 'js');
        
        let targeet = [
            path.join( this.getPath( 'input', 'js' ), `**/*.${this.ext.js}` )
        ];
        
        status.mainTaskID = 'build:js';
        
        // ファイル結合を使う場合は_から始まるファイルは無視する
        if( ops.concat.use ) {
            targeet.push( '!'+path.join( this.getPath( 'input', 'js' ), `**/_*.${this.ext.js}` ) );
        }
        
        gulp
            .src( targeet )
            .pipe( _if(status.isWatching, changed(destPath, ops.changed)) )   // 監視状態であれば変更されたファイルだけに絞る
            .pipe( _if(useSourcemaps, sourcemaps.init(ops.sourcemaps.init)) ) // ソースマップ初期化
            .pipe( plumber(ops.plumber) )
            .pipe( babel(ops.babel) )
            .pipe( _if(useSourcemaps, sourcemaps.write( ops.sourcemaps.write)) ) // ソースマップ出力
            .pipe( gulp.dest(destPath) )
            .on( 'end', done );
    }
}

// 
// JSファイルの監視
// =============================================================================
tasks['watch:js'] = {
    'task' : function( done ) {
        let status        = this.status;
        let ops           = this.options;
        let srcPath       = this.getPath('input', 'js');
        let destPath      = this.getPath('output', 'js');
        status.mainTaskID = 'watch:js';
        status.isWatching = true;

        let target = [ path.join( this.getPath( 'input', 'js' ), `**/*.${this.ext.js}` ) ];
        if ( ops.concat.use ) {
            for( let key in ops.concat.list ) {
                let ignore = '!'+path.join( srcPath, `${key}.js` );
                target.push( ignore );
            }
        }
        gulp.watch( target, gulp.series('build:js') );
    }
}


module.exports = tasks;
