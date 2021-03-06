'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = require('path');
var carlo = _interopDefault(require('carlo'));

const ALERT_PAGE = 'alert.html';
const CONFIRM_PAGE = 'confirm.html';
const PROMPT_PAGE = 'prompt.html';
const CHOOSE_PAGE = 'choose.html';
const CHOOSE_DROPDOWN_PAGE = 'choosedropdown.html';
const CHOOSE_MULTIPLE_PAGE = 'choosemultiple.html';

const defaultStyle = fs.readFileSync(path.join(__dirname, '../static/style.css'), 'utf8');
const defaultOptions = {
  pageBody: ALERT_PAGE,
  style: defaultStyle,
  top: 0,
  left: 0,
  width: 192 * 2,
  height: 108 * 2,
  title: '?'
};

const customized = ({
  pageBody = defaultOptions.pageBody,
  style = defaultOptions.style,
  top = defaultOptions.top,
  left = defaultOptions.left,
  width = defaultOptions.width,
  height = defaultOptions.height,
  title = defaultOptions.title
} = defaultOptions) => async (message, ...rest) => new Promise(async (resolve, reject) => {
  const app = await carlo.launch();
  app.serveFolder(path.join(__dirname, '..', 'static'));
  await app.exposeFunction('info', () => ({
    message,
    rest,
    style,
    title
  }));
  await app.exposeFunction('resolve', data => {
    resolve(data);
    app.exit();
  });
  await app.exposeFunction('reject', data => {
    reject(data);
    app.exit();
  });
  const window = app.mainWindow();
  window.setBounds({
    top,
    left,
    width,
    height
  });

  window.onbeforeunload = () => reject(new Error('window unloaded'));

  await app.load(pageBody);
});

const alert = customized({
  title: 'Alert'
});
const confirm = customized({
  pageBody: CONFIRM_PAGE,
  title: 'Confirm'
});
const prompt = customized({
  pageBody: PROMPT_PAGE,
  title: 'Prompt'
});
const choose = customized({
  pageBody: CHOOSE_PAGE,
  title: 'Choose'
});
const choosedropdown = customized({
  pageBody: CHOOSE_DROPDOWN_PAGE,
  title: 'Choose'
});
const choosemultiple = customized({
  pageBody: CHOOSE_MULTIPLE_PAGE,
  title: 'Choose Multiple'
});

exports.alert = alert;
exports.confirm = confirm;
exports.prompt = prompt;
exports.choose = choose;
exports.choosedropdown = choosedropdown;
exports.choosemultiple = choosemultiple;
exports.customized = customized;
