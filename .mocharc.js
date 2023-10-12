module.exports ={
    slow: 50000, //если какие-то тетсты идут медленно
    timeout: 60000, //сколько времени нужно для прохождения теста
    spec: './test/*.test.js', // обязательно нужно, показывает путь к тестовым файлам.
    reporter: 'mocha-multi-reporters',
    reporterOptions: ['configFile=reporterConfig.json']
}