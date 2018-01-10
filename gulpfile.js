const path = require('path');
let task = require('./withpro-gulp-js');

// console.log(__dirname);

task
    .setPath( 'input', {
        'root' : path.join( __dirname, 'src' )
    })
    .setPath( 'input', {
        'root' : path.join( __dirname, 'build' )
    });
