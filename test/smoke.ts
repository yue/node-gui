import * as gui from 'gui'

{
  // Event handler.
  const win = gui.Window.create({})
  win.onClose = () => {}
  const id = win.onClose.connect(() => {})
  win.onClose.disconnect(id)
  win.onClose.disconnectAll()
  win.shouldClose = () => false
}

{
  // File dialogs.
  const dialog = gui.FileOpenDialog.create()
  dialog.setFilters([
    {description: 'image', extensions: ['.jpg', '.png']},
    {description: 'text', extensions: ['.txt']},
  ])
  dialog.run()
  dialog.getResults()
}

{
  // Singletons.
  gui.screen.getPrimaryDisplay().scaleFactor
  gui.app.activate(true)
}
