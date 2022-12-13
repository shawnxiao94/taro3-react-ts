import React from 'react'
import { View, Text } from '@tarojs/components'

// 方式二、使用store比较简单
import { useAppDispatch, useAppSelector } from '@/store'
import { getMovieData } from '@/store/demo'

const Index: React.FC = () => {
  // 使用：方式二
  // 通过useSelector直接拿到store中定义的demo
  const { list } = useAppSelector(store => store.demo)
  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch()

  return (
    <View className='index'>
      <Text>my page</Text>
      <main>
        <h1>电影列表</h1>
        <button
          onClick={() => {
            dispatch(getMovieData())
          }}>
          获取数据
        </button>
        <ul>
          {list.map((item, index) => {
            return <li key={index}> {item.name}</li>
          })}
        </ul>
      </main>
    </View>
  )
}

export default Index
