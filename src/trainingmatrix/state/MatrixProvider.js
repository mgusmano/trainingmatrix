import React, { createContext, useReducer, useContext } from 'react';
import * as functions from './MatrixFunctions'
import { MatrixReducer } from './MatrixReducer';
import {getValues } from './Util'
import { styles } from '../styles';

const MatrixContext = createContext();

export const MatrixProvider = (props) => {

  const getFunctions = {
    setGroupID: (payload) => functions.setGroupID(dispatch, payload),
    setRowsArray: (payload) => functions.setRowsArray(dispatch, payload),
    setColsArray: (payload) => functions.setColsArray(dispatch, payload),

    showTopDialog: (payload) => functions.showTopDialog(dispatch, payload),
    setTop: (payload) => functions.setTop(dispatch, payload),
    setMain: (payload) => functions.setMain(dispatch, payload),
    showSkillDialog: (payload) => functions.showSkillDialog(dispatch, payload),
    showOperatorDialog: (payload) => functions.showOperatorDialog(dispatch, payload),
    showMainDialog: (payload) => functions.showMainDialog(dispatch, payload),
    showSecondaryDialog: (payload) => functions.showSecondaryDialog(dispatch, payload),

    setCellData: (payload) => functions.setCellData(dispatch, payload),

    setUserName: (payload) => functions.setUserName(dispatch, payload),
    setActive: (payload) => functions.setActive(dispatch, payload),
    setAll: (payload) => {
      functions.setAll(dispatch, payload)
    },
    updateOperatorGoal: (payload) => functions.updateOperatorGoal(dispatch, payload),

    setAuthenticatedUser: (payload) => functions.setAuthenticatedUser(dispatch, payload),
    updateSkillGoal: (payload) => functions.updateSkillGoal(dispatch, payload),
    setRightTotals: (payload) => functions.setRightTotals(dispatch, payload),
    setBottomTotals: (payload) => functions.setBottomTotals(dispatch, payload),
    setCurrentCertification: (payload) => functions.setCurrentCertification(dispatch, payload),
    setOperators: (payload) => functions.setOperators(dispatch, payload),
    setSkills: (payload) => functions.setSkills(dispatch, payload),
    setCertifications: (payload) => functions.setCertifications(dispatch, payload),
    setBySkill: (payload) => functions.setBySkill(dispatch, payload),
    setByOperator: (payload) => functions.setByOperator(dispatch, payload),
    setSpecific: (payload) => functions.setSpecific(dispatch, payload),
    setDimensions: (payload) => functions.setDimensions(dispatch, payload),
    setOriginal: (payload) => functions.setOriginal(dispatch, payload),

    toggleLegend: (payload) => functions.toggleLegend(dispatch, payload),
    updateCert: (payload) => functions.updateCert(dispatch, payload),
  }

  const initialState = {
    groupID: null,
    rowsArray: null,
    colsArray: null,
    topDialog: 'none',
    top: null,
    main: null,
    skillDialog: 'none',
    operatorDialog: 'none',
    mainDialog: 'none',
    secondaryDialog: 'none',
    celldata: {},
    userName: 'initmatrix',
    authenticateduser: '',
    operatorgoal: 0,
    skillgoal: 0,
    bottomtotals: [],
    righttotals: [],
    currentcertification: null,
    active: false,
    operators: [],
    skills: [],
    certifications: [],
    bySkill: null,
    byOperator: null,
    specific: null,
    dimensions: null,
    original: null,

    showTheLegend: false,
    styles: styles,
  }
  const[state, dispatch] = useReducer(MatrixReducer, initialState);

  return (
    <MatrixContext.Provider value={{
      ...getValues(state, initialState),
      ...getFunctions
    }}>
      {props.children}
    </MatrixContext.Provider>
  );
}
export const useMatrixState = () => useContext(MatrixContext);
