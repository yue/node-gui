const gui = require('..')

const win = gui.Window.create({})

gui.MessageLoop.postTask(() => gui.MessageLoop.quit())
gui.MessageLoop.run()
