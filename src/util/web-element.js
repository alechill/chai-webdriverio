const isWebElementIDShape = v => v.ELEMENT !== undefined

const isWebElementShape = v => !!v.value && isWebdriverElDescriptor(v.value)

export const describesWebElement = v => isWebdriverEl(v) || isWebdriverElDescriptor(v)

export const webElement = (v, client) => { // : v is Client<RawResult<Element>>
  if (isWebElementShape(v)) {
    return client.element(v.value)
  } else if (isWebElementIDShape(v)) {
    return client.elementIDElement(v, '.')
  }
  return false
}
