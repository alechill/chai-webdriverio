import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';
import expectedMessage from '../util/expected-message';
import shouldWait from '../util/should-wait';
import {
    describesWebElement,
    webElemement
} from '../util/web-element';

function hasCount(client, selector, count, countStore) {
    const elements = client.elements(selector).value;

    countStore.count = elements.length;

    return elements.length === count;
}

function waitUntilCount(client, selector, count, defaultWait=0, reverse) {
    const countStore = {};

    if (!reverse) {
        try {
            client.waitUntil(
                () => hasCount(client, selector, count, countStore),
                defaultWait
            );
        } catch (error) {
            throw new Error(
                `Element with selector ${selector} does not appear in the DOM ${count} times ` +
                    `within ${defaultWait} ms, but it shows up ${countStore.count} times instead.`
            );
        }
    } else {
        client.waitUntil(
            () => !hasCount(client, selector, count, countStore),
            defaultWait,
            `Element with selector ${selector} still appears in the DOM ${count} times after ${defaultWait} ms`
        );
    }
}

export default function count(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('count', function(expected) {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');

        if (describesWebElement(selector)) {
            throw new Error('Can only count matches for a selector, but was provided a solitary WebElement, ' +
                                'as Highlander put it... "There can be only One! <========|==o "')
        }

        if (shouldWait(this, utils)) {
            waitUntilCount(client, selector, expected, config.defaultWait, negate);
        }

        const countStore = {};

        this.assert(
            hasCount(client, selector, expected, countStore),
            expectedMessage(selector, `to appear in the DOM ${expected} times, but it shows up ${countStore.count} times instead.`),
            expectedMessage(selector, `not to appear in the DOM ${expected} times, but it does.`)
        );
    });
}
