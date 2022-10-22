# ray-drag-resize-v3

## 安装
```
npm install ray-drag-resize-v3
```
## 引入
```
import dragResizeV3 from 'ray-drag-resize-v3'
import 'ray-drag-resize-v3/lib/style.css'
Vue.use(dragResizeV3)
```
## 使用
```
<drag-resize @onDragResize="handleData">
  content
</drag-resize>

methods:{
  handleData(data){
    console.log(data)
  }
}
```
## props
属性|描述|default|type|注释
--|--|--|--|--
nodeKey | 组件的key |  uuid() | number/string|
minh | 最小高度 | 100 | number|
minw | 最小高度 | 100 | number|
init | 初始信息 | {width: 100,height: 100,top: 0,left: 0,}|object|可以设置默认的宽高及位置信息
disabled|禁止拖拽和放大缩小|false|boolean/string|true,false 控制整个组件的拖拽或放大缩小,当你只需要禁用一个时，可通过传入：'drag'/'resize'来禁用某一项功能

## events
函数名|描述
--|--
onDragResize|拖拽或设置大小后抛出的事件 包含当前组件的位置及大小信息及nodeKey
### 说明
此组件为vue3版本的组件，如需要vue2版本的安装 ray-drag-resize-v2。
如有改进建议[github](https://github.com/Ray-wgs/ray-drag-resize-v3)提issue。
