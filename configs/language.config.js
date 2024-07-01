const { CPP, C, PYTHON, JAVA, NODEJS, RUBY, PROMPTV1, PROMPTV2, DART, GO, RUST, PHP } = require('../enums/supportedLanguages')
const ONE_MB = 1024 // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = process.env.ALLOWED_RAM || 512

const LANGUAGES_CONFIG = {
    [C]: {
        compile: 'gcc -o a.out solution.c',
        run: './a.out',
        timeout: 2,
        filename: 'solution.c',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [CPP]: {
        compile: 'g++ -o a.out -pthread -O0 solution.cpp',
        run: './a.out',
        timeout: 2,
        filename: 'solution.cpp',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PYTHON]: {
        compile: 'python -m compileall -q solution.py',
        run: 'python solution.py',
        timeout: 10,
        filename: 'solution.py',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [JAVA]: {
        compile: 'javac Solution.java',
        run: 'java Solution',
        timeout: 4,
        filename: 'Solution.java',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [NODEJS]: {
        compile: 'node --check solution.js',
        run: 'node solution.js',
        timeout: 10,
        filename: 'solution.js',
        memory: 786432,
    },
    [RUBY]: {
        compile: 'ruby -c solution.rb',
        run: 'ruby solution.rb',
        timeout: 10,
        filename: 'solution.rb',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PROMPTV1]: {
        model: 'gpt-4-1106-preview',
    },
    [PROMPTV2]: {
        model: 'gpt-3.5-turbo-1106',
    },
    [DART]: {
        compile: 'dart compile exe solution.dart -o solution.exe',
        run: 'dart solution.dart',
        timeout: 10,
        filename: 'solution.dart',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [GO]: {
        compile: 'go build -o solution solution.go',
        run: './solution',
        timeout: 5,
        filename: 'solution.go',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [RUST]: {
        compile: 'rustc -o solution solution.rs',
        run: './solution',
        timeout: 5,
        filename: 'solution.rs',
        memory: ALLOWED_RAM * ONE_MB,
    },
}

module.exports = { LANGUAGES_CONFIG }