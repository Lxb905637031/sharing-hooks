---
nav: 
  path: /hooks
---

# useCreation

`useCreation` 是 `useMemo` 或 `useRef` 的替代品

因为 `useMemo` 不能保证被 memo 的值一定不会被重新计算

而相比于 `useRef`, 可以使用 `useCreation` 创建一些常量，和 `useRef` 创建出来的 ref 有很多使用场景上的相似，但相对于复杂常量的创建，`useRef` 容易出现潜在的性能隐患。

```javascript
// 每次重新渲染，都会执行实例化 Subject 的过程，即便这个实例立刻被扔掉
const a = useRef(new Subject())

// 通过 factory 函数，可以避免性能隐患
const b = useCreation(() => new Subject(), [])
```

## 代码演示

### 基础用法

## API

```typescript
function useCreation<T>(factory: () => T, deps: any[]): T
```

### Params

| 参数      | 说明        | 类型        | 默认值      |
| ---------| ------------| -----------| -----------|
| factory | 用来创建所需要对象的函数 | `() => any` | - |
| deps | 传入依赖变化的对象 | `any[]` |   -       |
