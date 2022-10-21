export interface dragResizeProps {
  activeColor:string,
  minh:number,
  minw:number,
  nodeKey?:number|string,
  init?:dragResizePropsInit
}
export interface dragResizePropsInit{
  width?:number|string,
  height?:number|string,
  top?:number|string,
  left?:number|string,
}
export interface dragResizeData{
  width?:number|string,
  height?:number|string,
  top?:number|string,
  left?:number|string,
  nodeKey?:number|string
}