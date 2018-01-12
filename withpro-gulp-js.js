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
 
module.exports = taskAssist;
