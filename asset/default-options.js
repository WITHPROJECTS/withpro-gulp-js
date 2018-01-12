const notifier = require('node-notifier');
const path     = require('path');

let options = {};

/**
 * concatの設定
 *
 */
options['concat'] = {
    'use'  : false,
    'list' : false
}
/**
 * concatの設定
 *
 */
options['changed'] = {
    'extension' : 'js'
}
/**
 * babelの設定
 *
 */
options['babel'] = {
    'minified' : true,
    'comments' : false,
    'presets'  : [
        [
            'env',
            {
                'loose'    : true,
                'modules'  : false,
                'browsers' : ['last 3 version']
            }
        ]
    ]
}
/**
 * sourcemaps
 * 
 */
options['sourcemaps'] = {
    'use'   : true,
    'init'  : {},
    'write' : {
        includeContent : true
    }
}
/**
 * plumberの設定
 *
 */
options['plumber'] = {
    'sound'        : 'Pop',
    'errorHandler' : function(err) {
        if ( err ) {
            // console.log(processs.cwd());
            // err.fileName
            console.log(err);
            console.error(err.message);
            notifier.notify({
                'title'   : `JS ${err.name}`,
                'message' : `${err.name} : ${err.relativePath}\n{ Line : ${err.loc.line}, Column : ${err.loc.column} }`,
                'sound'   : options['plumber']['sound']
            });
        }
    }
};


module.exports = options;
