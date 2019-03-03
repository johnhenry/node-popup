import { join } from 'path';
import carlo from 'carlo';

const ALERT_PAGE = 'alert.html';
const CONFIRM_PAGE = 'confirm.html';
const PROMPT_PAGE = 'prompt.html';
const CHOOSE_PAGE = 'choose.html';
const CHOOSE_DROPDOWN_PAGE = 'choosedropdown.html';
const CHOOSE_MULTIPLE_PAGE = 'choosemultiple.html';

const defaultStyle = `
*{
    box-sizing: border-box;
}

body {
    display: grid;
    grid-template-areas:
        "text text text"
        "inpt inpt inpt"
        ".... cncl okay";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 3fr 1fr;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    margin: 0;
    padding: 8% 8%;
    height:100%;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: #BEBEBE;
    background-color: #1E1E1E;
}
body div, body div label{
    display: block;
}
body select,
body input,
body button {
    display: inline-block;
}
body label{
    text-align:left;
}
body label input{
    margin-right: 4px;
    vertical-align: text-bottom;
}

button{
    border: 0;
    background: none;
    box-shadow: none;
    border-radius: 4px;
}
button#cancel::before {
    content: 'Cancel';
}
body #text{
    grid-area: text;
}
body #input{
    grid-area: inpt;
}
button#cancel {
    grid-area: cncl;
    background-color: #FFFFFF;
    color: #3478C6;
}
button#ok::before {
    content: 'OK';
}
button#ok {
    grid-area: okay;
    background-color: #3478C6;
    color: #FFFFFF;
}
#text, #input{
    margin-bottom: 4px;
}
`;
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
  app.serveFolder(join(__dirname, '..', 'static'));
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
  title: 'Alert!'
});
const confirm = customized({
  pageBody: CONFIRM_PAGE,
  title: 'Confirm?'
});
const prompt = customized({
  pageBody: PROMPT_PAGE,
  title: 'Prompt?'
});
const choose = customized({
  pageBody: CHOOSE_PAGE,
  title: 'Choose?'
});
const choosedropdown = customized({
  pageBody: CHOOSE_DROPDOWN_PAGE,
  title: 'Choose?'
});
const choosemultiple = customized({
  pageBody: CHOOSE_MULTIPLE_PAGE,
  title: 'Choose Multiple?'
});

export { alert, confirm, prompt, choose, choosedropdown, choosemultiple, customized };
