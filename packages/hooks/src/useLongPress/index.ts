import { useRef } from 'react'
import useLatest from '../useLatest'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import isBrowser from '../utils/isBrowser'
import useEffectWithTarget from '../utils/useEffectWithTarget'

type EventType = MouseEvent | TouchEvent
export interface Options {
  delay?: number;
  moveThreshold?: {
    x?: number;
    y?: number;
  };
  onClick?: (event: EventType) => void;
  onLongPressEnd?: (event: EventType) => void;
}

function getClientPostion(event: EventType) {
  if (event instanceof TouchEvent) {
    return {
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY
    }
  }

  if (event instanceof MouseEvent) {
    return {
      clientX: event.clientX,
      clientY: event.clientY
    }
  }

  console.error('Unsupported event type')

  return {
    clientX: 0,
    clientY: 0
  }
}

const touchSupported = 
  isBrowser &&
  // @ts-ignore
  ('ontouchstart') in window || (window.DocumentTouch && document instanceof DocumentTouch)

function useLongPress(
  onLongPress: (evnet: EventType) => void,
  target: BasicTarget,
  {
    delay = 300,
    moveThreshold,
    onClick,
    onLongPressEnd
  } : Options = {}
) {
  const onLongPressRef = useLatest(onLongPress)
  const onClickRef = useLatest(onClick)
  const onLongPressEndRef = useLatest(onLongPressEnd)

  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const isTriggeredRef = useRef(false)
  const prevPositionRef = useRef({
    x: 0,
    y: 0
  })

  const hasMoveThreshold = !!(
    (moveThreshold?.x && moveThreshold.x > 0) ||
    (moveThreshold?.y && moveThreshold.y > 0)
  )

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target)
      if (!targetElement?.addEventListener) {
        return
      }

      const overThreshold = (event: EventType) => {
        const { clientX, clientY } = getClientPostion(event)
        const offsetX = Math.abs(clientX - prevPositionRef.current.x)
        const offsetY = Math.abs(clientY - prevPositionRef.current.y)

        return !!(
          (moveThreshold?.x && offsetX > moveThreshold.x) ||
          (moveThreshold?.y && offsetY > moveThreshold.y)
        )
      }

      const onStart = (event: EventType) => {
        if (hasMoveThreshold) {
          const { clientX, clientY } = getClientPostion(event)
          prevPositionRef.current.x = clientX
          prevPositionRef.current.y = clientY
        }
        timerRef.current = setTimeout(() => {
          onLongPressRef.current(event)
          isTriggeredRef.current = true
        }, delay)
      }

      const onMove = (event: EventType) => {
        if (timerRef.current && overThreshold(event)) {
          clearInterval(timerRef.current)
          timerRef.current = undefined
        }
      }

      const onEnd = (evnet: EventType, shouldTriggerClick: boolean = false) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }

        if (isTriggeredRef.current) {
          onLongPressEndRef.current?.(evnet)
        }

        if (shouldTriggerClick && !isTriggeredRef.current && onClickRef.current) {
          onClickRef.current(evnet)
        }

        isTriggeredRef.current = false
      }

      const onEndWithClick = (event: EventType) => onEnd(event, true)

      if (touchSupported) {
        targetElement.addEventListener('touchstart', onStart)
        targetElement.addEventListener('touchend', onEndWithClick)
        if (hasMoveThreshold) {
          targetElement.addEventListener('touchmove', onMove)
        }
      } else {
        targetElement.addEventListener('mousedown', onStart)
        targetElement.addEventListener('mouseup', onEndWithClick)
        targetElement.addEventListener('mouseleave', onEnd)
        if (hasMoveThreshold) {
          targetElement.addEventListener('mousemove', onMove)
        }
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          isTriggeredRef.current = false
        }

        if (touchSupported) {
          targetElement.removeEventListener('touchstart', onStart)
          targetElement.removeEventListener('touchend', onEndWithClick)
          if (hasMoveThreshold) {
            targetElement.removeEventListener('touchmove', onMove)
          }
        } else {
          targetElement.removeEventListener('mousedown', onStart)
          targetElement.removeEventListener('mouseup', onEndWithClick)
          targetElement.removeEventListener('mouseleave', onEnd)
          if (hasMoveThreshold) {
            targetElement.removeEventListener('mousemove', onMove)
          }
        }
      }
    },
    [],
    target
  )
}

export default useLongPress
