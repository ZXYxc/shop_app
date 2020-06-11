// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],

  // vant引入：
  plugins: [
    [
      'import',
      {
        libraryName: 'Vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
      },
      'Vant'
    ]
  ]
}
