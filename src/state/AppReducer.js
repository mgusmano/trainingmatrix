import * as types from './AppTypes';

export const AppReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_GROUPID: return {...state,groupID:payload}
    case types.SET_OPERATORS: return {...state,operators:payload}
    case types.SET_SKILLS: return {...state,skills:payload}
    case types.SET_CERTIFICATIONS: return {...state,certifications:payload}
    case types.SET_GROUPS: return {...state,groups:payload}
    case types.SET_LEGEND: return {...state,legend:payload}
    case types.SET_MULTIPLIER: return {...state,multiplier:payload}
    default: return state;
  }
}