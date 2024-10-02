import { useEffect, useState, useRef } from 'react'
import screenfull from 'screenfull'
import useLatest from '../useLatest'
import useMemoizedFn from '../useMemoizedFn'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import { isBoolean } from '../utils'

export interface PageFullscreenOptions {
  className?: string;
  zIndex?: number
}

export interface Options {
  onExit?: () => void;
  onEnter?: () => void;
  pageFullscreen?: boolean | PageFullscreenOptions
}

const useFullscreen = (target: BasicTarget, options?: Options) => {
  const {
    onExit,
    onEnter,
    pageFullscreen
  } = options || {}

  const {
    className = 'hooks-page-fullscreen',
    zIndex = 999999
  } = isBoolean(pageFullscreen) || !pageFullscreen ? {} : pageFullscreen

  const onEnterRef = useLatest(onEnter)
  const onExitRef = useLatest(onExit)

  const [state, setState] = useState(getIsFullscreen)
  const stateRef = useRef(getIsFullscreen())

  function getIsFullscreen() {
    return (
      screenfull.isEnabled &&
      !!screenfull.element &&
      screenfull.element === getTargetElement(target)
    )
  }

  const invokeCallback = (fullscreen: boolean) => {
    if (fullscreen) {
      onEnterRef.current?.()
    } else {
      onExitRef.current?.()
    }
  }

  const updateFullscreenState = (fullscreen: boolean) => {
    // 阻止state没有变化重复调用
    if (stateRef.current !== fullscreen) {
      setState(fullscreen)
      invokeCallback(fullscreen)
      stateRef.current = fullscreen
    }
  }

  const onScreenfullChange = () => {
    const fullscreen = getIsFullscreen()

    updateFullscreenState(fullscreen)
  }

  const togglePageFullscreen = (fullscreen: boolean) => {
    const el = getTargetElement(target)

    if (!el) {
      return
    }

    let styleElem = document.getElementById(className)

    if (fullscreen) {
       // @ts-ignore
      el.classList.add(className)

      if (!styleElem) {
        styleElem = document.createElement('style')
        styleElem.setAttribute('id', className)
        styleElem.textContent = `
        .${className} {
          position: fixed; left: 0; top: 0; right: 0; bottom: 0;
          width: 100% !important; height: 100% !important;
          z-index: ${zIndex};
        }
        `
      }
      // @ts-ignore
      el.appendChild(styleElem)
    } else {
      // @ts-ignore
      el.classList.remove(className)

      if (styleElem) {
        styleElem.remove()
      }
    }

    updateFullscreenState(fullscreen)
  }

  const enterFullscreen = () => {
    const el = getTargetElement(target)

    if (!el) {
      return
    }

    if (pageFullscreen) {
      togglePageFullscreen(true)
      return
    }

    if (screenfull.isEnabled) {
      try {
        // @ts-ignore
        screenfull.request(el)
      } catch (error) {
        console.error(error)
      }
    }
  }


  const exitFullscreen = () => {
    const el = getTargetElement(target)

    if (!el) {
      return
    }

    if (pageFullscreen) {
      togglePageFullscreen(false)
      return
    }

    if (screenfull.isEnabled && screenfull.element === el) {
      screenfull.exit()
    }
  }

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  useEffect(() => {
    if (!screenfull.isEnabled || pageFullscreen) {
      return
    }

    screenfull.on('change', onScreenfullChange)

    return () => {
      // @ts-ignore
      screenfull.on('change', onScreenfullChange)
    }
  }, [])

  return [
    state,
    {
      enterFullscreen: useMemoizedFn(enterFullscreen),
      exitFullscreen: useMemoizedFn(exitFullscreen),
      toggleFullscreen: useMemoizedFn(toggleFullscreen),
      isEnable: screenfull.isEnabled
    }
  ] as const
}

export default useFullscreen
