#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.green('Hello!!'));

// the playerName variable is used to store the name of the player
let playerName;

// the sleep function is used to delay the execution of the code
const sleep = (ms = 2000 ) => new Promise((r) => setTimeout(r, ms));

// the welcome function is used to display a welcome message to the user
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Who wants to be a Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}.
        So get all the questions right...
    `);
}


// the askName function is used to ask the player for their name and store it in the playerName variable
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Anonymous';
        },
    });
    playerName = answers.player_name;
}


async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'How do you create a function in JavaScript?\n',
        choices: ['function myFunction() {}',
            'create function myFunction() {}',
            'make function myFunction() {}',
            'define myFunction() {}',
        ],
    });

    return handleAnswer(answers.question_1 == 'function myFunction() {}');
}


async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'How do you find the length of a string in JavaScript?\n',
        choices: ['string.size',
            'string.length',
            'string.count',
            'string.index',
        ],
    });

    return handleAnswer(answers.question_2 == 'string.length');
}


async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Which method is used to add an element to the end of an array?\n',
        choices: ['push()',
            'pop()',
            'shift()',
            'unshift()',
        ],
    });

    return handleAnswer(answers.question_3 == 'push()');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'How can you get the last element of an array in JavaScript?\n',
        choices: ['array.last()',
            'array[-1]',
            'array[array.length - 1]',
            'array.end()',
        ],
    });
    return handleAnswer(answers.question_4 == 'array[array.length - 1]');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'What is the correct way to write a Javascript object?\n',
        choices: ['let obj = {name: "John", age: 30};',
            'let obj = (name: "John", age: 30);',
            'let obj = ["name": "John", "age": 30];',
            'let obj = "name": "John", age: 30;',
        ],  
    });
    return handleAnswer(answers.question_5 == 'let obj = {name: "John", age: 30};');
}

async function question6() {
    const answers = await inquirer.prompt({
        name: 'question_6',
        type: 'list',
        message: 'How do you remove an element from a specific index in an array?\n',
        choices: ['array.pop(index)',
            'array.remove(index)', 
            'array.splice(index, 1)', 
            'array.delete(index)'
        ],
    });
    return handleAnswer(answers.question_6 == 'array.splice(index, 1)');
}


async function question7() {
    const answers= await inquirer.prompt({
        name: 'question_7',
        type: 'list',
        message: 'What is the correct way to write a JavaScript comment?\n',
        choices: ['//This is a comment',
            '<!--This is a comment-->',
            '/*This is a comment*/',
            'This is a comment'
        ],
    });
    return handleAnswer(answers.question_7 == '//This is a comment');
}


async function question8() {
    const answers= await inquirer.prompt({
        name: 'question_8',
        type: 'list',
        message: 'What is the output of the following code: console.log([1, 2, 3].map(num => num * 2));\n',
        choices: ['[2, 4, 6]',
            '[1, 2, 3]',
            '[1, 2, 3, 1, 2, 3]',
            '[0.5, 1, 1.5]'
        ],
    });
    return handleAnswer(answers.question_8 == '[2, 4, 6]');
}

async function handleAnswer(correct) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (correct) {
        spinner.success({ text: `Nice work ${playerName}!`});
    } else {
        spinner.error({ text: `💀💀💀 Game Over, you lose ${playerName}!`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}!`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}



await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await winner();
