import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

export default function visible(client, chai, utils, options) {
    const config = configWithDefaults(options);

    chai.Assertion.addMethod('visible', function() {
        const negate = utils.flag(this, 'negate');
        const selector =  utils.flag(this, 'object');

        if (shouldWait(this, utils)) {
          client.waitForVisible(selector, config.defaultWait, negate);
        }

        const isVisible = describesWebElement(selector) ? webElement(selector).isVisible() : client.isVisible(selector);
        const visibleArray = (Array.isArray(isVisible)) ? isVisible : [isVisible];
        const anyVisible = visibleArray.includes(true);

        this.assert(
            anyVisible,
            expectedMessage(selector, 'to be visible but it is not'),
            expectedMessage(selector, 'to not be visible but it is')
        );
    });
}
