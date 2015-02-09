/**
 * Created by Gerardo on 09/02/2015.
 */
module.exports = function(grunt){
    var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
        autopreFixPlugin = new LessPluginAutoPrefix({browsers:["> 5%"]});

    grunt.initConfig({
        less:{
            production:{
                options:{
                    compress:true,
                    yuicompress:true,
                    plugins:[
                        autopreFixPlugin
                    ]
                },
                files:{
                    "app/public/css/main.min.css":"src/less/**/*.less"
                }
            }
        },
        uglify:{
            options:{
                sourceMap:true,
                sourceMapIncludesSourcces:true,
                compress:{
                    drop_console:false
                }
            },
            main:{
                files:{
                    'app/public/js/main.min.js':['src/js/*.js']
                }
            }
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:['app/public/css/*.css', 'app/**/*.php', 'app/public/js/*.js']
                },
                options:{
                    watchTask:true
                }
            }
        },
        watch:{
            stylesheets:{
                files:'src/less/**/*.less',
                tasks: ['less']
            },
            script:{
                files:'src/js/*.js',
                tasks:'uglify'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['less', 'uglify', 'browserSync', 'watch']);

}