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
 * plumberの設定
 *
 */
options['plumber'] = {
    'sound'        : 'Pop',
    'errorHandler' : function(err) {
        if ( err ) {
            console.error(err.message);
            notifier.notify({
                'title'   : `Sass ${err.name}`,
                'message' : `${err.name} : ${err.relativePath}\n{ Line : ${err.line}, Column : ${err.column} }`,
                'sound'   : options['plumber']['sound']
            });
        }
    }
};


module.exports = options;
