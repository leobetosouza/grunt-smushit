/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2012 Helder Santana
 * http://heldr.com
 * MIT License
 */
module.exports = function( grunt ) {
    'use strict';

    function _hasImageExtension( str ) {

        var pattern = /\.(png|gif|jp(e)?g)$/i;
        return pattern.test( str );

    }

    grunt.registerMultiTask( 'smushit', 'remove unnecessary bytes from image files', function() {
        var smushit = require( 'node-smushit' ),
            wrench = require('wrench'),
            path = require( 'path' ),
            fs = require('fs'),
            logError = grunt.fail.fatal,
            task = this,
            source = task.file.src,
            copyFile = grunt.file.copy,
            files = [],
            dest = task.file.dest;

        if( dest && grunt.utils.kindOf( source ) === 'string' && !_hasImageExtension( source ) ) {
            files = wrench.readdirSyncRecursive(source).filter(function (filename) {
                return fs.statSync(source + '/' +  filename).isFile();
            });

        } else {
            files = grunt.file.expand(source);
        }

        task.callSmushit = function( done, files, output ) {

            var smushit_settings = {
                recursive: true,
                onItemComplete: function( response ) {
                    task.filesSmashed++;
                    if ( output ) {
                        grunt.log.writeln( '[grunt-smushit] New optimized file: ' + output.blue );
                    }
                },
                onComplete: function( response ) {
                    if ( task.filesToSmash === task.filesSmashed ) {
                        done( true );
                    }
                }
            };

            if (output) {
                smushit_settings.output = output;
            }

            smushit.smushit( files , smushit_settings );

        };


        var destination = function( done, files, output ) {

            var outputFile = '' , sourceFile = '', followHierarchy;

            if ( !/\/$/.test(output) ) {
                output += '/';
            }

            if ( !_hasImageExtension( source ) ) {

                followHierarchy = true;

                if ( !/\/$/.test( source )  ) {
                    source += '/';
                }
            }

            files.forEach( function( fileName ) {

                if ( followHierarchy ) {

                    outputFile = output + fileName;
                    sourceFile = source + fileName;

                } else {

                    outputFile = output + path.basename(fileName);
                    sourceFile = fileName;

                }

                wrench.mkdirSyncRecursive( path.dirname(outputFile) );

                if(fileName !== outputFile) {
                    task.callSmushit( done, sourceFile, outputFile );
                }

            });

        };

        if( files.length ) {

            var done = task.async(),
                action;
            task.filesToSmash = files.length;
            task.filesSmashed = 0;

            action = (dest) ? destination : task.callSmushit;
            action( done , files , dest );

        } else {
            logError('Image not found, please check if you put the right path.');
        }
    });

};
