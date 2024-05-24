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
await winner();
