import { View, Text } from '@tarojs/components'
import './index.scss'

import { testFn } from '@/utils'

function index() {
  testFn()
  return (
    <View className='index'>
      <Text>hello world</Text>
    </View>
  )
}

export default index
