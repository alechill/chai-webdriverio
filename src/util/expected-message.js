import {
  describesWebElement,
  expectedWebElementMsg
} from './web-element'

const expectedSelectorMsg = v => `Expected a DOM node matching <${v}>`

const expectedWebElementMsg = v => `Expected WebElement <${JSON.stringify(v.value || v)}>`

export default expectedMessage = (v, msg) =>
  `${describesWebElement(v) ? expectedWebElementMsg(v) : expectedSelectorMsg(v)} ${msg || ''}`
