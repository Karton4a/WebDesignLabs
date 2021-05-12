import { Controller } from './Controller/Controller.js'
import { ItemListView } from './View/ItemListView.js'

let view = new ItemListView()
let controller = new Controller(view)

controller.addLink('https://www.google.com')
controller.addLink('https://www.youtube.com/watch?v=-_ZZAX_zt7Y')