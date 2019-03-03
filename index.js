const customized = require('./customized.js');
const {ALERT_PAGE,
CONFIRM_PAGE,
PROMPT_PAGE,
CHOOSE_PAGE,
CHOOSE_DROPDOWN_PAGE,
CHOOSE_MULTIPLE_PAGE
} = require('./pages.js');

module.exports.customized = customized;
module.exports.alert = customized();
module.exports.confirm = customized({pageBody:CONFIRM_PAGE});
module.exports.prompt = customized({pageBody:PROMPT_PAGE});
module.exports.choose = customized({ pageBody: CHOOSE_PAGE });
module.exports.choosedropdown = customized({pageBody:CHOOSE_DROPDOWN_PAGE});
module.exports.choosemultiple = customized({ pageBody: CHOOSE_MULTIPLE_PAGE });
