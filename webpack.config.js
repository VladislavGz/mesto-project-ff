const path = require('path');                                       //подключаем path к конфигу вебпак (для преобразования относительных путей в абсолютные)
const HtmlWebpackPlugin = require('html-webpack-plugin');           //плагин HtmlWebpackPlugin для работы вебпака с HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin');     //плагин CleanWebpackPlugin для обновления HTML в dist при каждой новой сборке
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    //плагин mini-css-extract-plugin для склейки файлов всех CSS-файлов, связанных директивой @import, в один

module.exports = {
    //devtool: 'source-map',                                        //благодаря этому параметру в браузере код будет выглядеть как и в среде разработки.
                                                                    //прописываем его при отладке, чтобы проще было дебажить. При сборке для публикации - удаляем

    entry: { main: './src/index.js' },                              //путь к файлу, который считается точкой входа

    output: {
        path: path.resolve(__dirname, 'dist'),                      //путь к директории, которая считается точкой выхода. Сюда будут залиты файлы финальной сборки
        filename: 'main.js',                                        //имя файла в директории dist, который и будет результатом сборки js-файлов
        publicPath: ''
    },

    mode: 'development',                                            //добавили режим разработчика

    devServer: {
        static: path.resolve(__dirname, './dist'),                  //путь, куда "смотрит" режим разработчика
        compress: true,                                             //это ускорит загрузку в режиме разработки
        port: 8080,                                                 //порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true                                                  //сайт будет открываться сам при запуске npm run dev
    },

    module: {
        rules: [                                                    // rules — это массив правил
            {                                                       //объект правил для бабеля
                test: /\.js$/,                                      // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader',                                // при обработке этих файлов нужно использовать babel-loader
                exclude: '/node_modules/'                           // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },


            {                                                       //правило для обработки файлов
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,  // регулярное выражение, которое ищет все файлы с такими расширениями
                type: 'asset/resource'                              //позволяет переносить исходные файлы в конечную сборку в том же формате
            },

            {                                                       //правило для обработки CSS
                test: /\.css$/,                                     //применять это правило только к CSS-файлам
                use: [MiniCssExtractPlugin.loader, {                //при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
                    loader: 'css-loader',
                    options: { importLoaders: 1 }                   //нужно, если используется директива @import
                },
                    'postcss-loader'                                //добавляем postcss-loader
                ]
            }
        ]
    },

    plugins: [                                                      //plugins - массив плагинов
        new HtmlWebpackPlugin({                                     //подключаем плагин HtmlWebpackPlugin (создается новый экземпляр класса) для обработки HTML
            template: './src/index.html'                            //путь к файлу index.html
        }),

        new CleanWebpackPlugin(),                                   //подключаем плагин CleanWebpackPlugin

        new MiniCssExtractPlugin()                                  //подключение плагина mini-css-extract-plugin для объединения файлов
    ]
};