import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

export default function focus(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('focus', function() {
        const selector =  utils.flag(this, 'object');

        if (shouldWait(this, utils)) {
          elementExists(client, selector, config.defaultWait);
        }

        const hasFocus = describesWebElement(selector) ? webElement(selector).hasFocus() : client.hasFocus(selector);

        this.assert(
            hasFocus,
            expectedMessage(selector, 'to be focused but it is not'),
            expectedMessage(selector, 'to not be focused but it is')
        );
    });
}
