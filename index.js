#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.green('Hello!!'));

let playerName;

const sleep = (ms = 2000 ) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
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

await welcome();

// so basically what the code above does is to display a welcome message to the user