# Guess a Number
## A React Native learning project

*Guess a Number* is a mini-project, suggested in Academind's React Native course. It consists of a mobile app that receives a user number input. Then, the computer will try to guess which number it was, based on the user's hint. This is another approach to typical Guess a Number apps.

## Screenshots
<p align="center">
  <img src="/docs/_media/01.png" alt="Screenshot of the first screen. It shows the name of the app, then a field to insert a number. Two buttons, one to reset and clean the input, and the other to confirm your choice" width="250">
</p>

Screenshot of the first screen. Two buttons, one is used to reset and clean the input, and the other to confirm your choice. It only accepts positive integers.

<p align="center">
 <img src="/docs/_media/03.png" alt="Screenshot when confirm is pressed. Another box appears underneath, showing the selected number and a button titled 'Start Game'" width="250">
</p>

After confirmation, the number of your choice will appear below. The game won't start until you press the *Start Game* button.

<p align="center">
 <img src="/docs/_media/04.png" alt="Screenshot of the game. There is a text 'Opponent's Guess' and the number 46. There is a box with two buttons, one with a minus sign and the other with a plus sign. At the bottom, there is a list of numbers, one column representing the guess number and the other the suggested number" width="250">
</p>

The screen of the game itself. Now the user's task is to inform the computer whether the chosen number is greater of less than the one appearing on the screen in the "Opponent's Guess" section. Yes, you give hints so that the computer can correctly guess the chosen number.

A list of previous guesses is displayed below.

<p align="center">
 <img src="/docs/_media/05.png" alt="Screenshot when the game is done. A picture of a sleeping cat is shown and the text 'Your phone needed 7 rounds to guess the number 25' appears. There is also a button labeled 'New Game'" width="250">
</p>

If the computer guesses the number correctly, the game is over. This screen shows how many guesses it took the computer to get the correct number.

## Install and Use
In order to install, clone this repository and run:
```javascript
npm install
// OR
yarn install
```

This app was built with [Expo](https://expo.io/), so you need it to run. To do this, run:
```javascript
npm run start
// OR
yarn start
```

This starts the *Metro Bundler*. You can simulate the app in an Android emulator (such as in [Android Studio](https://developer.android.com/studio)) or on your own Android or iOS device by downloading the [Expo App](https://expo.io/tools#client).