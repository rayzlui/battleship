import {RootViewContainer} from './containers/RootViewContainer'
import React from 'react'
import {Provider} from 'react-redux'
import { configureStore } from './configureStore'

const store = configureStore()

export function App(){
  return(
    <Provider store={store}>
      <RootViewContainer/>
    </Provider>
  )
}


export default App;







