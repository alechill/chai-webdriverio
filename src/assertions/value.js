import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

export default function value(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('value', function(expected) {
        const selector =  utils.flag(this, 'object');

        if (shouldWait(this, utils)) {
            elementExists(client, selector, config.defaultWait);
        }

        const elementValue = describesWebElement(selector) ? webElement(selector).getValue() : client.getValue(selector);
        const valueArray = (elementValue instanceof Array) ? elementValue : [elementValue];

        var elementValueAsExpected;
        if (typeof(expected) == "string") {
            elementValueAsExpected = valueArray.some(value => value === expected);
        } else {
            elementValueAsExpected = valueArray.some(value => value.match(expected));
        }

        this.assert(
            elementValueAsExpected,
            expectedMessage(selector, ` to contain value "${expected}", but only found these values: ${valueArray}`),
            expectedMessage(selector, ` not to contain value "${expected}", but found these values: ${valueArray}`)
        );
    });
}
