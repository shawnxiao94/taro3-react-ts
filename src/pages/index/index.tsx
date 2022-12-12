import { View, Text, Button } from '@tarojs/components'
import './index.scss'

import Skeleton from '@/components/Skeleton'
import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { changeVal, loadUserInfo } from '@/store/user'

// 注意函数命名得为首字母大写
const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
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
            <Text>hello world!</Text>
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
    </View>
  )
}

export default Index
