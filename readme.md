# Popup

Simulates browser-style alerts (alert, confirm, prompt) from the commandline using a promise based API.

Note: this project uses [carlo](https://github.com/GoogleChromeLabs/carlo) and you'll need a copy of [chrome](https://www.google.com/chrome/) installed for this it to work.

# Installation

```sh
npm install popup
```

# usage

## alert

Simulate an alert box.

```javascript
import {alert} from 'node-popup';
alert('hello world');

```

## confirm

Simulate a confrim box.

Note: popup functions will retun a promise that will be rejected if the window is closed or the "cancel" button is clicked.

```javascript
import {confrim} from 'node-popup';
const main = ()=>{
    try{
        await confrim('Confirm or Deny?');
        console.log('Confirmed!');// OK button clicked
    }catch(error){
        console.log('Denied!');// cancel button clicked
    }
}
main();
```


## prompt

Simulate a prompt box.

Note: The answer returned is a string.

```javascript
import {prompt} from 'node-popup';
const main = ()=>{
    try{
        const name = await prompt('What\'s your name?', '"Default Name"');
        console.log(`Hello ${name}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main();
```

## choose, choosedropdown

Like **prompt**, but with multiple choices instead of a free text box.

Using **choose** will present a list of answers as radio buttons.

```javascript
import {choose} from 'node-popup';
const main = ()=>{
    try{
        const name = await choose('What\'s your choice?', 'choice 0', 'choice 1', 'choice 3');
        console.log(`You choose: ${prompt}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main();
```

Using **choosedropdown** will present a list of answers as radio buttons.

```javascript
import {choosedropdown} from 'node-popup';
const main = ()=>{
    try{
        const choice = await choosedropdown('What is your choice?', 'choice 0', 'choice 1', 'choice 3');
        console.log(`You have chosen: ${choice}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main();
```

## choosemultiple, choosedropdown

Like **choose**, but with multiple answers can be selected via checkboxes.

Using **choose** will present a list of answers as radio buttons.

```javascript
import {choose} from 'node-popup';
const main = ()=>{
    try{
        const choice = await choose('What\'s your choice?', 'choice a', 'choice b', 'choice c');
        console.log(`You choose: ${choice}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main();
```

## choosemultiple

Note: The answer returned is an array of strings.

```javascript
import {choosemultiple} from 'node-popup';
const main = ()=>{
    try{
        const choices = await choosemultiple('What are your choices?', 'alpha', 'beta', 'gamma');
        console.log(`Your choices are ${choice.join(',')}`);// OK button clicked
    }catch(error){
        console.log('Canceled!');// cancel button clicked
    }
}
main();
```

## Custom Popups

You can create customized popups.

```javascript
import {customized} from 'node-popup';

const customizedPopup = customized({
    pageBody,// Body of page to use. See ./pages.js for options
    style, // Style. See ./style.css for default. Note: css containing character '>' currently fails
    top = defaultOptions.top, // Top of window
    left = defaultOptions.left, // Left of window
    width = defaultOptions.wdith, // Width of window
    height = defaultOptions.height, // Height of window
    title = defaultOptions.title // Title of window
});
```

# Debugging

This can be useful for quick debugging; but should be viewed as an anti-pattern.
