import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

export default function there(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('there', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');

        var isThere = !negate;
        if (shouldWait(this, utils)) {
            try {
                elementExists(client, selector, config.defaultWait, negate);
            } catch (error) {
                isThere = negate;
            }
        } else {
            isThere = webElement(selector).isExisting()
        }

        this.assert(
            isThere,
            expectedMessage(selector, 'to be there, but it is not there.'),
            expectedMessage(selector, 'not to be there, and yet, there it is.')
        );
    });
}
