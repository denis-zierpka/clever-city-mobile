import React from "react";
import {createStore, createHooks, Provider} from "react-global-hook";

const initialState = {
  participantList: [],
  team: ''
};

export const actions = ({setState, getState}) => ({
  decrease() {
    setState({participantList: [], team: ''});
  },
  increase() {
    setState({
      participantList: [
        {
          login: 'alf',
          name: 'Никита',
          sir_name: 'Мастинен (Вы)'
        },
        {
          login: 'alf1',
          name: 'Альфред',
          sir_name: 'Нуртдинов'
        },
      ],
      team: 'Тестовая команда'
    });
  }
});

// /**
//  * The initializer run when Provider render
//  */
// const initializer = (state) => ({
//   ...state,
//   participantList: initialState,
// })

export const store = createStore(initialState, actions);
// export const useStore = createHooks(store);