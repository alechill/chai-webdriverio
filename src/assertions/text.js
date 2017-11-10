import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

export default function text(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('text', function(expected) {
        const selector =  utils.flag(this, 'object');

        if (shouldWait(this, utils)) {
            elementExists(client, selector, config.defaultWait, false);
        }

        const getText = describesWebElement(selector) ? webElement(selector).getText() : client.getText(selector);
        const textArray = (getText instanceof Array) ? getText : [getText];

        var elementTextAsExpected;
        if (expected instanceof RegExp) {
            elementTextAsExpected = textArray.some(text => text.match(expected));
        } else {
            elementTextAsExpected = textArray.some(text => text === expected);
        }

        this.assert(
            elementTextAsExpected,
            expectedMessage(selector, `to contain text "${expected}", but only found: ${textArray}`),
            expectedMessage(selector, `not to contain text "${expected}", but found: ${textArray}`)
        );
    });
}
