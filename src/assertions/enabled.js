import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';


export default function enabled(client, chai, utils, options) {
    const config = configWithDefaults(options);

    chai.Assertion.addMethod('enabled', function() {
        const negate = utils.flag(this, 'negate');
        const selector =  utils.flag(this, 'object');

        if (shouldWait(this, utils)) {
          client.waitForEnabled(selector, config.defaultWait, negate);
        }

        const isEnabled = describesWebElement(selector) ? webElement(selector).isEnabled() : client.isEnabled(selector);
        const enabledArray = (Array.isArray(isEnabled)) ? isEnabled : [isEnabled];
        const anyEnabled = enabledArray.includes(true);

        this.assert(
            anyEnabled,
            expectedMessage(selector, 'to be enabled but it is not'),
            expectedMessage(selector, 'to not be enabled but it is')
        );
    });
}
