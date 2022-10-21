import dragResize from './src/DragResize.vue'
import { App } from 'vue'

const install = (app:App) => {
    app.component(dragResize.name, dragResize)
}
export default install