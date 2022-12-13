import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtTabBar } from 'taro-ui'
import tabBarConfig from '@/config/tabBar'
// 新增react-redux相关 使用封装好的hooks
import { useAppSelector, useAppDispatch } from '@/store'
import { setTabBar } from '@/store/tabBar'
// import './index.scss'
const CustomTabBar = () => {
  // 获取当前tabbar的current
  const tabCurrent = useAppSelector(state => state.tabBar.current)
  const dispatch = useAppDispatch() // 定义显示的current
  const [current, setCurrent] = useState(0) // 监听修改了tabBar就触发当前修改

  useEffect(() => {
    setCurrent(tabCurrent)
  }, [tabCurrent]) // 触发tabBar点击事件，修改tabBar的current

  const handleClick = value => {
    dispatch(setTabBar(value))
    setCurrent(value)
    const url = '/' + tabBarConfig[value].pagePath
    Taro.switchTab({ url })
  }
  return (
    <View>
      <AtTabBar
        tabList={[
          { title: '首页', iconType: 'bullet-list', text: 'new' },
          { title: '我的', iconType: 'user' }
        ]}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  )
}
export default CustomTabBar
