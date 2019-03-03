import {customized} from '../lib/customized.js';
import {
    ALERT_PAGE,
    CONFIRM_PAGE,
    PROMPT_PAGE,
    CHOOSE_PAGE,
    CHOOSE_DROPDOWN_PAGE,
    CHOOSE_MULTIPLE_PAGE
} from '../lib/pages.js';
export const alert = customized();
export const confirm = customized({pageBody:CONFIRM_PAGE});
export const prompt = customized({pageBody:PROMPT_PAGE});
export const choose = customized({ pageBody: CHOOSE_PAGE });
export const choosedropdown = customized({pageBody:CHOOSE_DROPDOWN_PAGE});
export const choosemultiple = customized({ pageBody: CHOOSE_MULTIPLE_PAGE });
export { customized };
