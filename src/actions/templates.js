export function setTemplateVisibility(templateVisibility) {
    return {
      type: 'SET_TEMPLATE_VISIBILITY',
      templateVisibility
    }
}

export function getTemplateVisibility() {
  return {
    type: 'GET_TEMPLATE_VISIBILITY',
  }
}