import { menus } from './hooks'

export default {
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  publicPath: '/sharing-hooks/',
  history: {
    type: 'hash'
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false
      },
      'fusion'
    ]
  ],
  title: 'SharingHooks',
  mode: 'site',
  favicon: '/sharing-hooks/sharing.png',
  logo: '/sharing-hooks/sharing.png',
  hash: true,
  alias: {
    sharingHooks: process.cwd() + '/packages/hooks/src/index.ts',
    ['sharing-hooks']: process.cwd() + '/packages/hooks/src/index.ts'
  },
  resolve: {
    includes: ['docs', 'packages/hooks/src']
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    {
      rel: 'stylesheet',
      href: '/style.css'
    }
  ],
  navs: [
    { title: '指南', path: '/guide' },
    { title: 'Hooks', path: '/hooks' },
    { title: 'GitHub', path: 'https://github.com/Lxb905637031/sharing-hooks'}
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '介绍',
        path: '/guide',
      },
    ],
    '/hooks': menus
  },
}