import {
    isWebElement
} from './web-element'

export default function assertElementExists(client, selector, defaultWait=0, reverse) {
    /*const isWebElement = isWebElement(selector, client)
    if (el) {
        const exists = el.isExisting()
        if (reverse && exists) {
            throw new Error(`${expectedElementMsg(selector)} to not exist`)
        } else if (!reverse && !exists) {
            throw new Error(`${expectedElementMsg(selector)} to exist`)
        }
    } else {*/
        try {
            client.waitForExist(selector, defaultWait, reverse);
        } catch (error) {
            if (reverse) {
            throw new Error(`Element with selector ${selector} still exists after ${defaultWait}ms (while waiting for it not to).`);
            } else {
            throw new Error(`Could not find element with selector ${selector} within ${defaultWait}ms`);
            }
        }
    //}
}
