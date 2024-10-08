# sharing-hooks

React 业务 Hooks

## 能力支持

### 1. 可靠的代码健壮

使用 Typescript 构建，提供完善的类型定义

### 2. 完善的文档能力

支持文档记录，支持 demo 演示

### 3. 完整的测试用例

配套完整的测试用例，提升项目健壮性

## 技术选型

### 包管理工具 -- pnpm

1. `pnpm`安装速度更快，磁盘利用率高；
2. `pnpm`的`lock`文件适用于多个单一子功能的模块，且能保证每个模块的依赖不藕合；
3. 打包产物清晰，打包后产物确保全部为静态站点资源；

### 构建工具 -- webpack & gulp

1. 最终产物为多个基础子功能模块的藕合，选择`gulp`这种流程式的构建工具，能够更清晰的表达构建流程；
2. 选择常用的`webpack`作为产物的声明式接入方式；
3. 结合`unpkg`进行在线 dist 文件访问

### 静态文件打包工具 -- dumi

为组件研发而生的静态解决方案

### 测试工具 -- jest

`jest`功能全面，资料丰富，能够很好地支撑原子化集合的工具函数

## 其他

### 生成`CHANGELOG`

参考[conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli)，全局安装`conventional-changelog-cli`：

```bash
npm install -g conventional-changelog-cli
pnpm run changelog
```
