#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName
const placeHolderName = 'John Doe'

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
  const titleAnimation = chalkAnimation.neon(
    'Who wants to be millionare \n'
  )

  await sleep()
  titleAnimation.stop()

  console.log(`
    ${chalk.blue('YOU MIGHT WONDER HOW DO YOU PLAY THIS THING?')}
    Well it's actually a great question now that you ask. 
    But you see, I'm not in the mood for explaining things.
    Luckly for you, it's kinda intuitive.
    So...do as you please, and ${chalk.red('suffer')} the consequences.
    `)
}

async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
  })

  playerName = answer.player_name
}

async function simpleTrial() {
  const rightAnswer = `You just mind your own buisness and provide helps to who needs it`
  const answer = await inquirer.prompt({
    name: 'simple_trial',
    type: 'list',
    message: 'This is a simple trial, choose wisely\n',
    choices: [
      'You have to write tests for the rest of your life',
      'You have to hang out with terminal haters',
      'You have to hang out with gui haters',
      rightAnswer,
    ]
  })

  return handleAnswer(answer.simple_trial == rightAnswer)
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start()
  await sleep()

  if (isCorrect) {
    spinner.success({ text: `Well done ${playerName || placeHolderName}!` })
    console.log()
  } else {
    spinner.error({ text: `Sorry ${playerName || placeHolderName}, you should try again` })
    console.log()
    process.exit(1)
  }
}

async function bloodTrial() {
  const rightAnswer = 'Jaws'
  const answer = await inquirer.prompt({
    name: 'blood_trial',
    type: 'list',
    message: 'This a blood trial, choose the best films of all times',
    choices: [
      'Interstellar',
      rightAnswer,
      'Avengers: End Game',
      'Midsommar',
      'The Grand Budapest Hotel',
      'Whiplash',
    ]
  })

  return await handleWinner(answer.blood_trial == rightAnswer)
}

async function handleWinner(isCorrect) {
  const spinner = createSpinner('Checking answer...').start()
  await sleep(3000)

  if (isCorrect) {
    spinner.success({ text: `Nailed it!` })
  } else {
    spinner.error({ text: `Don't worry that one was tricky, let me help you a bit` })
    console.log()
    await inquirer.prompt({
      name: 'second_chancce',
      type: 'list',
      message: `Look, try again, I bet you don't miss this time`,
      choices: [
        'Jaws',
        'Jaws',
        'Jaws',
        'Jaws',
        'Jaws',
      ]
    })
    
  }
}

function winner() {
  console.clear()
  const msg = `Congrats ${playerName || placeHolderName}!`   
  const known = `The million it's all yours`
  const info = `You might die before you spent all this, or what is worst, spent it all way before you die!`

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
    console.log(chalk.green(known))
    console.log(chalk.grey(info))
  })
}

await welcome()
await askName()
await simpleTrial()
await bloodTrial()
winner()
