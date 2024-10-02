/**
 * title.zh-CN: 页面全屏
 */

 import React, { useRef } from 'react'
 import { useFullscreen } from 'sharing-hooks'
 import { Button } from 'antd'
 
 export default () => {
   const ref = useRef(null)
   const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(ref,{
    pageFullscreen: true
   })
   return (
    <div style={{ background: 'white' }}>
     <div ref={ref} style={{ background: '#4B6BCD', padding: 12 }}>
       <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
       <div>
         <Button  onClick={enterFullscreen}>
           enterFullscreen
         </Button>
         <Button  onClick={exitFullscreen} style={{ margin: '0 8px' }}>
           exitFullscreen
         </Button>
         <Button  onClick={toggleFullscreen}>
           toggleFullscreen
         </Button>
       </div>
     </div>
    </div>

   )
 }
 