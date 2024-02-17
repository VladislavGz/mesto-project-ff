const autoprefixer = require('autoprefixer');                                   //autoprefixer для автоматического добавления вендорных префиксов
const cssnano = require('cssnano');                                             //cssnano для минификации CSS

module.exports = {
  plugins: [                                                                    // подключите плагины к PostCSS
    autoprefixer,                                                               // подключите autoprefixer
    cssnano({ preset: 'default' })                                              // cssnano при подключении нужно передать объект опций
                                                                                // { preset: default } говорит о том, что нужно использовать стандартные настройки минификации
  ]
};