import dragResize from './src/index.vue'
import {App} from 'vue'
const install = (app:App,opt?:dragResizeProps) =>{
  app.component(dragResize.name,dragResize)
}
export default install