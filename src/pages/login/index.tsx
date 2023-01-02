import { FC, useState, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
// import tools from '@/utils/tools'
// import { toLogin } from '@/apis/Login'
import defaultHeaderPng from '@/assets/images/login/default_header.png'
import styles from './index.module.scss'
import ViewContainer from '@/components/ViewContainer'
import { formatTimeDate, formatTimeTime } from '@/utils'

// type InputType = 'phone' | 'password'

const Index: FC = () => {
  const { certifiedStatus = 2 } = Taro.getStorageSync('userInfo') || {}
  const [refuse, setRefuse] = useState<any>({})
  const beginBind = useCallback(e => {
    console.log('e', e)
    if (e?.detail?.iv) {
      // request({ method: 'POST', tartget: 'userWechatBind', data: e.detail }).then(data => {
      //   if (data.success) {
      //     saveToken(data.model)
      //     Taro.reLaunch({ url: '/pages/index/index' })
      //   }
      // })
    }
  }, [])

  const authFn = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/login/realNameAuthentication/index'
    })
  }, [])
  return (
    <ViewContainer className='columnCenter'>
      <View className={`${styles.textCenter} ${styles.headerWap}`}>
        <Image className={styles.header} src={defaultHeaderPng} />
      </View>
      <>
        {certifiedStatus === 2 ? (
          // '未注册'
          <>
            <View className={`${styles.textCenter} ${styles.text1}`}>您还未登录</View>
            <View className={`${styles.textCenter} ${styles.text2}`}>请先完成授权并登录</View>
          </>
        ) : certifiedStatus === 0 ? (
          // '未通过'
          <>
            <View className={`${styles.textCenter} ${styles.text1}`}>您的认证未通过</View>
            <View className={`${styles.textCenter} ${styles.text2}`}>请先重新认证</View>
            <View className={`${styles.textCenter} ${styles.text2}`}>
              驳回时间：{formatTimeDate(refuse?.createTime)} {formatTimeTime(refuse?.createTime)}
            </View>
            <View className={`${styles.textCenter} ${styles.text2}`}>
              驳回理由：{refuse?.rejectionReason}
            </View>
          </>
        ) : certifiedStatus === 3 ? (
          // 3 '已注册'
          <>
            <View className={`${styles.textCenter} ${styles.text1}`}>您还未认证</View>
            <View className={`${styles.textCenter} ${styles.text2}`}>请先完成认证</View>
          </>
        ) : certifiedStatus === 4 ? (
          <>
            <View className={`${styles.textCenter} ${styles.text1}`}>您已提交认证</View>
            <View className={`${styles.textCenter} ${styles.text2}`}>请耐心等候</View>
          </>
        ) : null}
      </>
      <>
        {certifiedStatus === 2 ? (
          // '未注册'
          <Button
            className={styles.button}
            plain
            hover-class='none'
            open-type='getPhoneNumber'
            onGetPhoneNumber={beginBind}>
            <Text className={styles.text}>微信一键登录</Text>
          </Button>
        ) : certifiedStatus === 0 ? (
          // 0 '未通过'
          <Button className={styles.button} plain hover-class='none' onClick={authFn}>
            <Text className={styles.text}>认证</Text>
          </Button>
        ) : certifiedStatus === 3 ? (
          // 3 '已注册',4 '待认证'
          <Button className={styles.button} plain hover-class='none' onClick={authFn}>
            <Text className={styles.text}>认证</Text>
          </Button>
        ) : certifiedStatus === 4 ? null : null}
      </>
    </ViewContainer>
  )
}

export default Index
