import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import {
//   about,
//   findUserInfo
// } from '@/service/api'

// 异步方式一
export const loadUserInfo = createAsyncThunk('user/fetchUserInfo', (data, thunkAPI) => {
  // thunkAPI：一个对象，其中包含通常传递给 Redux thunk 函数的所有参数，以及其他选项(参考：https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator)
  // findUserInfo(_data).then(res => {
  //   thunkAPI.dispatch(setUserInfo(res.result))
  // })
  // 模拟异步调接口
  setTimeout(() => {
    console.log('data', data)
    thunkAPI.dispatch(setUserInfo({ name: 'shawn' }))
  }, 5000)
})

// 使用createSlice方法创建一个slice。每一个slice里面包含了reducer和actions，实现模块化的封装
export const userSlice = createSlice({
  name: 'user', // 命名空间
  // state数据的初始值
  initialState: {
    count: 0,
    userInfo: {
      name: ''
    },
    sortList: [
      { label: '食品类', value: '食品类' },
      { label: '服装类', value: '服装类' },
      { label: '日用品类', value: '日用品类' }
    ]
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    // 导出为 actions
    increment(state, { payload }) {
      state.count = state.count + payload.step
    },
    changeVal: (state, action) => {
      // 第一个参数 state为当前state中的数据
      // 第二个参数 action为 {payload: [{ label: '家具类', value: '家具类' }], type: "user/changeVal"}
      // payload 为传过来的新参数值
      // type 为action触发类型
      console.log('changeVal:', JSON.parse(JSON.stringify(state)), state, action)
      state.sortList = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      console.log('userInfo:', JSON.parse(JSON.stringify(state)), state, action)
    }
  }
  // extraReducers: builder => {
  //   // 异步 actions 中触发与其他 slice 中数据的关联改变
  //   builder.addCase(userInfo.pending, state => {
  //     console.log('pending', state)
  //   })
  //   builder.addCase(userInfo.fulfilled, (state, { payload }) => {
  //     state.count = payload.data.count
  //   })
  //   builder.addCase(userInfo.rejected, (state, err) => {
  //     console.log(state, err)
  //   })
  // }
})

// export const userInfo = createAsyncThunk('user/userInfo', async () => {
//   return await about() // 返回的结果在 `.fulfilled` 中作为 `payload` 的值
// })

export const { increment, changeVal, setUserInfo } = userSlice.actions

export default userSlice.reducer // 导出 reducer
