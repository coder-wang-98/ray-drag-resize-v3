<template>
  <div class="drag-resize-container" ref="dragResize" @mousedown="onDrag">
    <slot>

    </slot>
    <div ref="resizeNode" class="resize-node" @mousedown.stop="onResize">

    </div>
  </div>
</template>

<script lang='ts' setup name="drag-resize">
import { toRefs,ref ,onMounted} from 'vue'
import {v4 as uuid} from 'uuid'
const props = defineProps({
  activeColor:{
    type:String,
    default:'rgba(119, 221, 178, 0.3)'
  },
  nodeKey:{
    type:[Number,String],
    default:uuid()
  },
  minh:{
    type:Number,
    default:100
  },
  minw:{
    type:Number,
    default:100
  }
})
const {activeColor,nodeKey,minh,minw} = toRefs(props)
const dragResize = ref()
const emits = defineEmits(['onDragResize'])
const onDrag = (e:MouseEvent)=>{
    const parentDom = dragResize.value.parentElement
    let oldPostion = parentDom.style.position
    parentDom.style.position = 'relative'
    let reg = /(\d+px, \d+px)/
    let curX,curY
    if(dragResize.value.style.transform.match(reg)){
      curX = dragResize.value.style.transform.match(reg)[0].split(',')[0]
      curY = dragResize.value.style.transform.match(reg)[0].split(',')[1]
    }
    let disX = e.clientX - parseFloat(curX) || dragResize.value.offsetLeft;
    let disY = e.clientY - parseFloat(curY) || dragResize.value.offsetTop;
    //阻止浏览器的默认事件
    e.preventDefault();
    document.onmousemove = function(e) {
      var x = e.clientX - disX;
      var y = e.clientY - disY;
        if (x < 0) {
            x = 0
        } else if (x > (parentDom.clientWidth - dragResize.value.clientWidth)) {
            x = parentDom.clientWidth - dragResize.value.clientWidth
        }
        if (y < 0) {
            y = 0
        } else if (y > (parentDom.clientHeight - dragResize.value.clientHeight)) {
            y = parentDom.clientHeight - dragResize.value.clientHeight
        }
        dragResize.value.style.transform = `translate(${x}px, ${y}px)`
        dragResize.value.setAttribute('left',e.clientX+'px')
        dragResize.value.setAttribute('right',e.clientY+'px')
    }
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        parentDom.style.position = oldPostion
        let reg = /(\d+px, \d+px)/
        let curX,curY
        if(dragResize.value.style.transform.match(reg)){
          curX = dragResize.value.style.transform.match(reg)[0].split(',')[0]
          curY = dragResize.value.style.transform.match(reg)[0].split(',')[1]
        }
        emits('onDragResize',{
            left:curX,
            top:curY,
            height:dragResize.value.style.height,
            width:dragResize.value.style.width,
            nodeKey:nodeKey.value
        })
    }
}
const onResize = ()=>{
    const parentDom = dragResize.value.parentElement
    const event = window.event as MouseEvent
    event?.stopPropagation()
    event?.preventDefault()
    const height = dragResize.value.clientHeight
    const width = dragResize.value.clientWidth
    const startX = event.clientX
    const startY = event.clientY
    const move = (moveEvent:MouseEvent) => {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const disY = currY - startY
        const disX = currX - startX
        const newHeight = (height + disY) > minh.value ?  (height + disY) > parentDom.clientHeight ? parentDom.clientHeight:(height + disY) : minh.value
        const newWidth = (width + disX) > minw.value ? (width + disX) > parentDom.clientWidth ? parentDom.clientWidth : (width + disX) : minw.value
        dragResize.value.style.width = newWidth + "px";
        dragResize.value.style.height = newHeight + "px";
        dragResize.value.setAttribute('width',newWidth+'px')
        dragResize.value.setAttribute('height',newHeight+'px')
    }

    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        emits('onDragResize',{
            left:dragResize.value.style.left,
            top:dragResize.value.style.top,
            height:dragResize.value.style.height,
            width:dragResize.value.style.width,
            nodeKey:nodeKey.value
        })
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
onMounted(()=>{
  dragResize.value.parentElement.style.position = 'relative'
  dragResize.value.style.transform = `translate(${dragResize.value.offsetLeft}px, ${dragResize.value.offsetTop}px)`
})
</script>
<style scoped lang='scss'>
.drag-resize-container{
  position: absolute;
  width: 100%;
  height: 100%;
  &:active{
    background-color: v-bind(activeColor);
    .resize-node {
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
    }
  }
  &:hover{
    background-color: v-bind(activeColor);
  }
  .resize-node{
    box-sizing: border-box;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    transition-duration: 2s;
  	transition-duration: 200ms;
    &:hover{
      bottom: 0px;
      right: 0px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>