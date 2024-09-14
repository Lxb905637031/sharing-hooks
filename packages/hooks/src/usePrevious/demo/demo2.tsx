/**
 * title: 自定义 shouldUpdate 函数
 * desc: 只有 shouldUpdate function 返回 true 时，才会记录值的变化。
 */

import React, { useState } from 'react'
import { usePrevious } from 'sharing-hooks'
import { Button, Input } from 'antd'

interface Person {
  name: string;
  job: string;
}

const compareJobFn = (prev: Person | undefined, next: Person): boolean => {
  if (!prev) {
    return true
  }

  if (prev['job'] !== next['job']) {
    return true
  }

  return false
}

const compareNameFn = (prev: Person | undefined, next: Person): boolean => {
  if (!prev) {
    return true
  }

  if (prev['name'] !== next['name']) {
    return true
  }

  return false
}

export default () => {
  const [state, setState] = useState({ name: 'jack', job: 'student' })
  const [nameInput, setNameInput] = useState('')
  const [jobInput, setJobInput] = useState('')

  const previousName = usePrevious(state, compareNameFn)
  const previousJob = usePrevious(state, compareJobFn)

  return (
    <>
      <div style={{ margin: '8px 0', padding: 8, border: '1px solid #e8e8e8' }}>
        <div>current name: { state.name }</div>
        <div>current job: { state.job }</div>
      </div>
      <div>previous name: {(previousName || {}).name}</div>
      <div style={{ marginTop: 8 }}>previous job: {(previousJob || {}).job}</div>
      <div style={{ marginTop: 8}}>
        <Input 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder='new name'
          style={{ width: 300 }}
        />
        <Button
          onClick={() => {
            setState((s) => ({
              ...s,
              name: nameInput
            }))
          }}
          style={{ marginLeft: 8}}
        >
          update
        </Button>
      </div>
      <div style={{ marginTop: 8}}>
        <Input 
          value={jobInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder='new job'
          style={{ width: 300 }}
        />
        <Button
          onClick={() => {
            setState((s) => ({
              ...s,
              name: jobInput
            }))
          }}
          style={{ marginLeft: 8}}
        >
          update
        </Button>
      </div>
    </>
  )

}