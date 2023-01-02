import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { AtTabBar } from 'taro-ui'
import tabBarConfig from '@/config/tabBar'

// 新增react-redux相关 使用封装好的hooks
import { useAppSelector, useAppDispatch } from '@/store'
import { setTabBar } from '@/store/tabBar'
import styles from './index.module.scss'

const CustomTabBar: React.FC = () => {
  // 获取当前tabBar的current
  const tabCurrent = useAppSelector(state => state.tabBar.current)
  const dispatch = useAppDispatch() // 定义显示的current
  const [current, setCurrent] = useState(0) // 监听修改了tabBar就触发当前修改

  useEffect(() => {
    setCurrent(tabCurrent)
  }, [tabCurrent]) // 触发tabBar点击事件，修改tabBar的current

  const handleClick = (index: number) => {
    dispatch(setTabBar(index))
    setCurrent(index)
    const url = '/' + tabBarConfig[index].path
    Taro.switchTab({ url })
  }
  return (
    <View className={styles['tabBar-cnt']}>
      <AtTabBar
        fixed
        selectedColor='#1890ff'
        tabList={tabBarConfig}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  )
}
export default CustomTabBar
