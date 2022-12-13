import { Component, PropsWithChildren } from 'react'
import './app.scss'

import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

// import log from '@/utils/log'

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}
  // componentDidCatchError(e: string) {
  //   log.error(e)
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    )
  }
}

export default App
