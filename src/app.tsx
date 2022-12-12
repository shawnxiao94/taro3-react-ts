import { Component, PropsWithChildren } from 'react'
import './app.scss'

import { Provider } from 'react-redux'
import store from '@/store/index'
// import log from '@/utils/log'

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}
  // componentDidCatchError(e: string) {
  //   log.error(e)
  // }

  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
