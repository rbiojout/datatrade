export const addExperiment = text => {
    return {
      type: 'ADD_EXPERIMENT',
      text
    }
}
  
export const updateExperiment = (id, text) => {
  return {
    type: 'UPDATE_EXPERIMENT',
    id,
    text
  }
}

export const deleteExperiment = id => {
  return {
    type: 'DELETE_EXPERIMENT',
    id
  }
}