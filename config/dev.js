/* eslint-disable camelcase */
process.env.APP_ENV = process.env.APP_ENV || 'dev'

require('dotenv-flow').config({
  // node_dev表示.env.{node_env}文件
  node_env: process.env.APP_ENV
})

module.exports = {
  env: {
    NODE_ENV: '"development"'
    // APP_VERSION: `"${process.env.npm_package_version}"`,
    // APP_ENV: `"${process.env.APP_ENV}"`,
    // APP_API: `"${process.env.APP_API}"` // 这么配置目前在业务文件中process使用提示process is not defined
  },
  defineConstants: {
    APP_API: `"${process.env.APP_API}"`,
    APP_NAME: `"${process.env.APP_NAME}"`,
    APP_VERSION: `"${process.env.npm_package_version}"`
  },
  mini: {},
  h5: {}
}
