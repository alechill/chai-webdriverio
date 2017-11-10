
export default shouldWait = (assertion, util) => {
  const immediately = util.flag(assertion, 'immediately')
  if (!immediately && describesWebElement(v)) {
    util.flag(assertion, 'message', 'Assertions on a pre-found WebElement can only be performed "immediately". Not waiting...')
    return false
  }
  return immediately
}
