import { View, Text, Button } from '@tarojs/components'
// 1.使用taro自带的生命周期函数
import { useDidShow } from '@tarojs/taro'
import './index.scss'

import Skeleton from '@/components/Skeleton'
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeVal, loadUserInfo } from '@/store/user'

import TabBar from '@/components/TabBar'

import { setTabBar } from '@/store/tabBar'

import UntrustedComponent from './components/UntrustedComponent'
import ErrorBoundary from '@/components/ErrorBoundary'
import DigitalSignature from '@/components/DigitalSignature'

// 注意函数命名得为首字母大写
const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  // 通过useDispatch 派发事件
  // 修改current为对应tabbar值，my页面索引为1
  dispatch(setTabBar(0))
  // 使用state中的数据
  const sortList = useSelector((state: any) => state.user.sortList)
  const handleGetUserInfo = () => {
    // 触发store中action以更新数据
    dispatch(loadUserInfo() as any)
  }
  const handleClick = () => {
    // 触发store中action以更新数据
    dispatch(
      changeVal([
        { label: '家具类', value: '家具类' },
        { label: '食品类', value: '食品类' }
      ])
    )
  }

  useDidShow(() => {
    console.log('页面展示时的回调 ')
  })

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <View className='index'>
      <Skeleton selector='skeleton' loading={loading} />
      <View className='skeleton'>
        <View className='mainBox'>
          <View className='box skeleton-rect'>
            <Text>hello world! 签字签名</Text>
            <DigitalSignature></DigitalSignature>
            <ErrorBoundary>
              <UntrustedComponent />
            </ErrorBoundary>
            <Button onClick={handleClick}>dispatch改变数据</Button>
            <Button onClick={handleGetUserInfo}>dispatch获取异步接口数据</Button>
            渲染数据：
            <ul>
              {sortList.map(el => (
                <li key={el.value}>{el.label}</li>
              ))}
            </ul>
          </View>
        </View>
      </View>
      <TabBar></TabBar>
    </View>
  )
}

export default Index
