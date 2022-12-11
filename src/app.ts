import { Component, PropsWithChildren } from 'react'
import './app.scss'

// import log from '@/utils/log'

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}
  // componentDidCatchError(e: string) {
  //   log.error(e)
  // }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
