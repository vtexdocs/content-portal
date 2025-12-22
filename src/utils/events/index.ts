// Custom event for toggling Agents dropdown
export const TOGGLE_AGENTS_DROPDOWN_EVENT = 'toggleAgentsDropdown'

export const emitToggleAgentsDropdown = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(TOGGLE_AGENTS_DROPDOWN_EVENT))
  }
}

export const listenToToggleAgentsDropdown = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    window.addEventListener(TOGGLE_AGENTS_DROPDOWN_EVENT, callback)
    return () =>
      window.removeEventListener(TOGGLE_AGENTS_DROPDOWN_EVENT, callback)
  }
  return undefined
}
