import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

// 引入其他 slice 生成的 action
import { increment } from '../user'

export interface MovieState {
  list: any[]
  totals: number
}
const initialState: MovieState = {
  list: [],
  totals: 0
}

// 请求电影列表
const getMovieListApi = () =>
  fetch(
    'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48'
  ).then(res => res.json())

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getMovieData = createAsyncThunk('movie/getMovie', async () => {
  const res = await getMovieListApi()
  return res
})

// 创建一个 Slice
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // 数据请求完触发
    loadDataEnd: (state: Draft<MovieState>, action: PayloadAction<{ list: any[] }>) => {
      state.list = action.payload.list
      state.totals = action.payload.list.length
    }
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions，
  // 包括由 createAsyncThunk 或其他slice生成的actions。
  extraReducers(builder) {
    // 处理其他 slice 生成的 actions
    builder.addCase(increment, state => {
      // increment方法触发时的处理
      state.list.push({ name: '加' })
      state.totals += 1
    })

    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, state => {
        console.log('🚀 ~ 进行中！')
      })
      .addCase(getMovieData.fulfilled, (state, { payload }) => {
        console.log('🚀 ~ fulfilled', payload)
        state.list = payload.data.list
        state.totals = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, err) => {
        console.log('🚀 ~ rejected', err)
      })
  }
})

// 导出方法
export const { loadDataEnd } = movieSlice.actions

// 默认导出
export default movieSlice.reducer
