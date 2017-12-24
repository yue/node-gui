// Type definitions for node-gui v0.2.1
// Project: https://github.com/yue/node-gui
// Definitions by: Scott Winkelmann <https://github.com/ScottishCyclops>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = gui

// Options Interfaces

declare interface createButtonOptions {
    title: string
    type: typeof ButtonNS.Type
}

declare interface createMenuItemOptions {
    type: typeof MenuItemNS.Type
    checked: boolean
    submenu: gui.Menu
    visible: boolean
    enabled: boolean
    label: string
    accelerator: string
    onClick: (self: gui.MenuItem) => any
}

declare interface createWindowOptions {
    /**
     * Whether window has native frame, default is `true`.
     */
    frame?: boolean

    /**
     * Whether window is transparent, default is `false`.
     *
     * Only frameless window can be transparent, the behavior of making a
     * normal window transparent is undefined.
     */
    transparent?: boolean

    /**
     * Whether to show window buttons for frameless window, default is `false`.
     *
     * This property is ignored for normal windows.
     * @macOS
     */
    showTrafficLights?: boolean
}

// Other types

declare const CColor: number | string

declare const TextAlign: "start" | "center" | "end"

// Structures

/**
 * Size type.
 *
 * This type is represented by an `Object` with `width` and `height`
 * properties.
 */
declare interface SizeF {
    /**
     * Size width.
     */
    width: number
    /**
     * Size height.
     */
    height: number
}

/**
 * Rectangle type.
 *
 * This type defines a simple integer rectangle class. The containment
 * semantics are array-like that is, the coordinate (x, y) is considered to be
 * contained by the rectangle, but the coordinate (x + width, y) is not.
 *
 * This type is represented by an `Object` with `x`, `y`, `width`, `height`
 * properties.
 */
declare interface RectF {
    /**
     * X coordinate.
     */
    x: number

    /**
     * Y coordinate.
     */
    y: number

    /**
     * Rectangle width.
     */
    width: number

    /**
     * Rectangle height.
     */
    height: number
}

/**
 * A point with x and y coordinate.
 *
 * This type is represented by an `Object` with `x` and `y` properties.
 */
declare interface PointF {
    /**
     * X coordinate.
     */
    x: number

    /**
     * Y coordinate.
     */
    y: number
}

/**
 * Two dimensions vector.
 *
 * This is represented by an `Object` with `x` and `y` properties, indicating a
 * distance in two dimensions between two points.
 */
declare interface Vector2dF {
    /**
     * X component.
     */
    x: number

    /**
     * Y component.
     */
    y: number
}

/**
 * Attributes for drawing text.
 *
 * By default text is drew at top-left corner using system font and color.
 */
declare interface TextAttributes {
    /**
     * Font for drawing text, default is system UI font.
     */
    font: gui.Font

    /**
     * Text color, default is system UI text color.
     */
    color: typeof CColor

    /**
     * Horizontal text align, default is to the start of layout.
     */
    align: typeof TextAlign

    /**
     * Vertical text align, default is to the start of layout.
     */
    valign: typeof TextAlign
}

// Classes namespaces

declare namespace AppNS {
    /**
     * Represent possible theme colors.
     */
    const ThemeColor: "text"
}

declare namespace ButtonNS {
    /**
     * Represent possible Button types.
     */
    const Type: "normal" | "checkbox" | "radio"

    /**
     * Represent visual types of `Button`.
     */
    const Style: "rounded" | "regular-square" | "thick-square" |
        "thicker-square" | "disclosure" | "shadowless-square" |
        "circular" | "textured-square" | "help-button" | "small-square" |
        "textured-hrounded" | "round-rect" | "recessed" |
        "rounded-disclosure" | "inline"
}

declare namespace FontNS {
    /**
     * Represent font weights.
     */
    const Weight: "thin" | "extra-light" | "light" | "normal" | "medium" |
    "semi-bold" | "bold" | "extra-bold" | "black"

    /**
     * Represent font styles.
     */
    const Style: "normal" | "italic"
}

declare namespace FileDialogNS {
    /**
     * FileDialog filters.
     */
    interface Filter {
        /**
         * Filter's description.
         */
        description: string,

        /**
         * An array of filename extensions for the filter.
         */
        extensions: string[]
    }
}

declare namespace MenuItemNS {
    const Type: "label" | "checkbox" | "radio" | "separator" | "submenu"
}

declare namespace ScrollNS {
    /**
     * Scrollbar policy.
     */
    const Policy: "always" | "never" | "automatic"
}

declare namespace ToolbarNS {
    /**
     * Possible display modes of `Toolbar`.
     */
    const DisplayMode: "default" | "icon-and-label" | "icon" | "label"

    /**
     * Represent an item of `Toolbar`.
     */
    interface Item {
        /**
         * Item's label.
         */
        label: string

        /**
         * Item's minimum size.
         */
        minSize: sizeF

        /**
         * Item's maximum size.
         */
        maxSize: SizeF

        /**
         * Item's image.
         */
        image: gui.Image

        /**
         * Item's custom view.
         */
        view: gui.View

        /**
         * Function called when item is clicked.
         */
        onClick: Function
    }
}

declare namespace VibrantNS {
    /**
     * The material of a `Vibrant` view.
     */
    const Material: "appearance-based" | "light" | "dark" | "titlebar"

    /**
     * The blending mode of a `Vibrant` view.
     */
    const BlendingMode: "behind-window" | "within-window"
}

declare namespace ViewNS {
    /**
     * Mouse event.
     */
    interface MouseEvent {
        /**
         * The mouse button being pressed, `1` is for left button, `2` is for
         * right button, `3` is for middle button.
         */
        button: number

        /**
         * Relative position inside the view where the event happened.
         */
        positionInView: PointF

        /**
         * Relative position inside the window.
         */
        positionInWindow: PointF
    }

    /**
     * Keyboard event.
     *
     * Keyboard keys are represented with strings, in Yue we use the values of
     * HTML5 DOM's KeyboardEvent.key to represent the keys. A list of available
     * keys can be found at: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     *
     * There is an exception that the *Space Bar* is represented as `"Space"`
     * in Yue instead of `" "`.
     */
    interface KeyEvent {
        /**
         * The key associated with the event.
         */
        key: string
    }
}

// Classes not in module

/**
 * Application class.
 *
 * This class represents current app and provides app wide APIs.
 *
 * This class can not be created by user, you can only receive its global
 * instance from the `app` property of the module.
 */
declare class App {
    /**
     * Set the application menu bar.
     * @macOS
     */
    setApplicationMenu(menu: gui.MenuBar): void

    /**
     * Return the application menu bar.
     * @macOS
     */
    getApplicationMenu(): gui.MenuBar

    /**
     * Return color of a theme component.
     */
    getColor(name: typeof AppNS.ThemeColor): Color

    /**
     * Return the default font for displaying text.
     */
    getDefaultFont(): gui.Font
}

/**
 * Event loop and application lifetime.
 *
 * This class initializes a GUI event loop, and provides APIs to manage
 * application's lifetime. Depending on the runtime you use, Yue may or may not
 * provide this API.
 *
 * This class can not be created by user, you can only receive its global
 * instance from the `lifetime` property of the module.
 */
declare class Lifetime {
    /**
     * Enter event loop.
     */
    run(): void

    /**
     * Quit event loop.
     */
    quit(): void

    /**
     * Post a `task` to event loop.
     */
    postTask(task: Function): void

    /**
     * Post a `task` to event loop and execute it after `ms`.
     * @param ms The number of milliseconds to wait
     */
    postDelayedTask(ms: number, task: Function): void

    /**
     * Emitted when received `applicationDidFinishLaunching` notification.
     * @macOS
     */
    onReady(): any
}

/**
 * Graphic context.
 *
 * The `Painter` class can not be created by user, its instance can only be
 * recevied in drawing events or via the `Canvas` class.
 */
declare class Painter {
    /**
     * Save the entire state of the painter.
     */
    save(): void

    /**
     * Restore the most recently saved state.
     */
    restore(): void

    /**
     * Create a new path.
     */
    beginPath(): void

    /**
     * Close current path and move current point to the start of current path.
     *
     * A straight line will be drew from current point to the start.
     */
    closePath(): void

    /**
     * Move current point to `point`.
     */
    moveTo(point: PointF): void

    /**
     * Connect the last point in current path to `point` with a straight line.
     */
    lineTo(point: PointF): void

    /**
     * Add a cubic Bézier curve to current path.
     *
     * The first two points are control points and the third one is the end
     * point. The starting point is the last point in the current path.
     */
    bezierCurveTo(cp1: PointF, cp2: PointF, ep: PointF): void

    /**
     * Add an arc to the path which is centered at `point` with `radius`
     * starting at `sa` angle and ending at `ea` angle going in clockwise
     * direction.
     * @param point Arc's center.
     * @param radius Arc's radius.
     * @param sa The angle at which the arc starts, measured clockwise from the
     * positive x axis and expressed in radians.
     * @param ea The angle at which the arc ends, measured clockwise from the
     * positive x axis and expressed in radians.
     */
    arc(point: PointF, radius: number, sa: number, ea: number): void

    /**
     * Add rectangle to current path.
     */
    rect(rect: RectF): void

    /**
     * Add current path to clip area by intersection.
     */
    clip(): void

    /**
     * Add `rect` to clip area by intersection.
     */
    clipRect(rect: RectF): void

    /**
     * Add translate transformation which moves the origin by `offset`.
     */
    translate(offset: Vector2dF): void

    /**
     * Add rotation transformation.
     * @param angle The angle to rotate clockwise in radians.
     */
    rotate(angle: number): void

    /**
     * Add scaling transformation to the painter.
     */
    scale(scale: Vector2dF): void

    /**
     * Set stroke color and fill color to `color`.
     */
    setColor(color: typeof CColor): void

    /**
     * Set the color used for shapes' outlines.
     */
    setStrokeColor(color: typeof CColor): void

    /**
     * Set the color used when filling shapes.
     */
    setFillColor(color: typeof CColor): void

    /**
     * Set the width of lines.
     */
    setLineWidth(width: number): void

    /**
     * Draw current path by stroking its outline.
     */
    stroke(): void

    /**
     * Draw a solid shape by filling current path's content area.
     */
    fill(): void

    /**
     * Draw a rectangular outline.
     */
    strokeRect(rect: RectF): void

    /**
     * Draw a filled rectangle.
     */
    fillRect(rect: RectF): void

    /**
     * Draw scaled `image` to fit `rect`.
     */
    drawImage(image: gui.Image, rect: RectF): void

    /**
     * Draw the specified portion of `image` at `src` to fit `rect`.
     */
    drawImageFromRect(image: gui.Image, src: RectF, dest: RectF): void

    /**
     * Draw scaled `canvas` to fit `rect`.
     */
    drawCanvas(canvas: gui.Canvas, rect: RectF): void

    /**
     * Draw the specified portion of `canvas` at `src` to fit `rect`.
     */
    drawCanvasFromRect(canvas: gui.Canvas, src: RectF, dest: RectF): void

    /**
     * Measure the `text` with `attributes`, with maximum `width`.
     * @param width Maximum width, passing -1 to indicate unlimited width.
     */
    measureText(text: string, width: number, attributes: TextAttributes): void

    /**
     * Draw `text` with `attributes` bounded by `rect`.
     */
    drawText(text: string, rect: RectF, attributes: TextAttributes): void
}

declare module gui {
    const app: App

    /**
     * Native button, can also be used as checkbox and radio button.
     */
    class Button extends View {
        /**
         * Create a normal button with `title`.
         */
        static create(title: string): Button

        /**
         * Create a button by reading `options`.
         */
        static create(options: createButtonOptions): Button

        /**
         * Set button title.
         */
        setTitle(title: string): void

        /**
         * Return the button title.
         */
        getTitle(): string

        /**
         * Set checked state of checkbox or radio.
         */
        setChecked(checked: boolean): void

        /**
         * Return whether checkbox or radio is checked.
         */
        isChecked(): boolean

        /**
         * Set the image of button.
         */
        setImage(image: Image): void

        /**
         * Return the image of button.
         */
        getImage(): Image

        /**
         * Set the visual style of the button.
         * @macOS
         */
        setButtonStyle(style: typeof ButtonNS.Style): void

        /**
         * Set whether the button has a border.
         * @macOS
         */
        setHasBorder(yes: boolean): void

        /**
         * Return whether the button has a border.
         * @macOS
         */
        hasBorder(): boolean

        /**
         * Emitted when button is clicked.
         */
        onClick(self: Button): any
    }

    /**
     * Offscreen drawing.
     */
    class Canvas {
        /**
         * Create a new canvas with specified size and scale factor.
         */
        static create(size: SizeF, scaleFactor: number): Canvas

        /**
         * Create a new canvas with `size` using default scale factor.
         *
         * This is strongly discouraged for using, since it does not work well
         * with multi-monitor setup. Only use it when you does not care about
         * per-monitor DPI.
         */
        static createForMainScreen(size: SizeF): Canvas

        /**
         * Return the scale factor of the canvas.
         */
        getScaleFactor(): number

        /**
         * Return the Painter that can be used to draw on the canvas.
         */
        getPainter(): Painter

        /**
         * Return the DIP size of canvas.
         */
        getSize(): SizeF
    }

    /**
     * 32-bit Color with alpha channel.
     *
     * `Color` is represented by a 32-bit ARGB integer.
     *
     * For APIs that accept `Color`, you can pass a hex string representing the
     * color, like `"#A123"`, `"#123"`, `"#AA112233"`, `"#112233"`.
     */
    const Color: {
        /**
         * Create an opaque RGB color.
         * @param r 8-bit red channel value.
         * @param g 8-bit green channel value.
         * @param b 8-bit blue channel value.
         */
        rgb(r: number, g: number, b: number): typeof CColor

        /**
         * Create an ARGB color.
         * @param r 8-bit red channel value.
         * @param g 8-bit green channel value.
         * @param b 8-bit blue channel value.
         */
        argb(a: number, r: number, g: number, b: number): typeof CColor
    }

    /**
     * The `Container` view is mainly used for two purposes:
     * - Show custom drawn content
     * - Display a collection of child views.
     */
    class Container extends View {
        /**
         * Create a new container view.
         */
        static create(): Container

        /**
         * Get the minimum size to show all children of the view.
         *
         * Note that if the view is using a `flex-wrap: wrap` style, this
         * method might return a extremely wide/high size since it does not
         * know the best width/height to show the children.
         */
        getPreferredSize(): SizeF

        /**
         * Return the minimum height to show all child of the view for the `width`.
         */
        getPreferredHeightForWidth(width: number): number

        /**
         * Return the minimum width to show all child of the view for the `height`.
         */
        getPreferredWidthForHeight(height: number): number

        /**
         * Append a child `view` to the container.
         *
         * This method will silently fail if the `view` already has a parent.
         */
        addChildView(view: View): void

        /**
         * Add a child `view` to the container at `index`.
         *
         * This method will silently fail if the `view` already has a parent.
         */
        addChildViewAt(view: View, index: number): void

        /**
         * Remove a child `view` from this container.
         *
         * This method will silently fail if the `view` is not a child of the
         * container.
         */
        removeChildView(view: View): void

        /**
         * Return the count of children in the container.
         */
        childCount(): number

        /**
         * Return the child `view` at `index`.
         *
         * This method will silently fail if the `index` is out of range.
         */
        childAt(index: number): View

        /**
         * Emitted when button the operating system or application requests to
         * draw a portion of the view.
         * @param painter The drawing context of the view.
         * @param dirty The area in the view to draw on.
         */
        onDraw(self: Container, painter: Painter, dirty: RectF): any
    }

    /**
     * Single-line text input view.
     */
    class Entry extends View {
        /**
         * Create a new `Entry`.
         */
        static create(): Entry

        /**
         * Change the text in the view.
         */
        setText(text: string): void

        /**
         * Return currently displayed text.
         */
        getText(): string

        /**
         * Emitted when user has changed text.
         */
        onTextChange(self: Entry): any

        /**
         * Emitted when user has pressed *Enter* in the view.
         */
        onActivate(self: Entry): any
    }

    /**
     * Base class for file dialogs.
     */
    class FileDialog {
        /**
         * Option that indicates the open dialog will open folders instead of
         * files.
         */

        optionPickFolders: number
        /**
         * Option that indicates the open dialog can select multiple items.
         */
        optionMultiSelect: number

        /**
         * Option that indicates hidden files will always show in the dialog.
         */
        optionShowHidden: number

        /**
         * Return the chosen item in dialog.
         */
        getResult(): string

        /**
         * Show the dialog and wait for result, return `true` if user has
         * chosen item(s).
         */
        run(): boolean

        /**
         * Show the dialog as a modal child of parent `window` and wait for
         * result, return `true` if user has chosen item(s).
         */
        runForWindow(window: Window): boolean

        /**
         * Set the title of the dialog.
         */
        setTitle(title: string): void

        /**
         * Set the text of accept button.
         */
        setButtonLabel(label: string): void

        /**
         * Set the filename to show in the dialog.
         */
        setFilename(filename: string): void

        /**
         * Set a `folder` that is always selected when the dialog is opened
         */
        setFolder(folder: string): void

        /**
         * A bit array of `options`.
         */
        setOptions(options: number): void

        /**
         * Set the file types that the dialog can open or save.
         */
        setFilters(filters: FileDialogNS.Filter[]): void
    }

    /**
     * Dialog used for opening files or folders.
     */
    class FileOpenDialog extends FileDialog {
        /**
         * Create an open dialog.
         */
        static create(): FileOpenDialog

        /**
         * Return the chosen items in dialog.
         *
         * @note `string[]` was guessed as return type but not confirmed
         */
        getResults(): string[]
    }

    /**
     * Dialog used for saveing files.
     */
    class FileSaveDialog extends FileDialog {
        /**
         * Create an save dialog.
         */
        static create(): FileSaveDialog
    }

    /**
     * Native font.
     */
    class Font {
        /**
         * Return the default font used for displaying text.
         */
        default(): Font

        /**
         * Create a Font implementation with the specified `name`, DIP `size`,
         * `weight` and `style`.
         */
        create(name: string, size: number, weight: typeof FontNS.Weight, style: typeof FontNS.Style): Font

        /**
         * Return font's family name.
         */
        getName(): string

        /**
         * Return font's DIP size.
         */
        getSize(): number

        /**
         * Return the font weight.
         */
        getWeight(): typeof FontNS.Weight

        /**
         * Return the font style.
         */
        getStyle(): typeof FontNS.Style
    }

    /**
     * Display a container view with title and border.
     */
    class Group extends View {
        /**
         * Create a new `Group` with `title`.
         */
        static create(title: string): Group

        /**
         * Set the content view.
         */
        setContentView(view: Container): void

        /**
         * Return the content view.
         */
        getContentView(): Container

        /**
         * Set the title.
         */
        setTitle(title: string): void

        /**
         * Return the title.
         */
        getTitle(): string
    }

    /**
     * Native image.
     */
    class Image {
        /**
         * Create an image by reading from `path`.
         */
        static createFromPath(path: string): Image

        /**
         * Return image's size in DIP.
         */
        getSize(): SizeF

        /**
         * Return image's scale factor.
         */
        getScaleFactor(): number
    }

    /**
     * Display text.
     */
    class Label extends View {
        /**
         * Create a new `Label` with `text`.
         */
        static create(text: string): Label

        /**
         * Set the text to display.
         */
        setText(text: string): void

        /**
         * Return the text displayed.
         */
        getText(): string
    }

    const lifetime: Lifetime

    /**
     * Popup menu.
     */
    class Menu extends MenuBase {
        /**
         * Create a popup menu.
         * @param items An array of menu items to be inserted to the menu.
         */
        static create(items: any[]): Menu
    }

    /**
     * Menu bar.
     */
    class MenuBar extends MenuBase {
        /**
         * Create a menubar.
         * @param items An array of menu items to be inserted to the menu.
         */
        static create(items: any[]): MenuBar
    }

    /**
     * Base class of menu bar and popup menu.
     */
    class MenuBase {
        /**
         * Append the `item` to the menu.
         */
        append(item: MenuItem): void

        /**
         * Insert the `item` at `index` to the menu.
         */
        insert(item: MenuItem, index: number): void

        /**
         * Remove the item from the menu.
         */
        remove(item: MenuItem): void

        /**
         * Return the count of items in the menu.
         */
        itemCount(): number

        /**
         * Return the item at `index`.
         */
        itemAt(index: number): MenuItem
    }

    /**
     * Menu item.
     */
    class MenuItem {
        /**
         * Create a menu item with `type`.
         */
        static create(type: typeof MenuItemNS.Type): MenuItem

        /**
         * Create a menu item with `options`.
         */
        static create(options: createMenuItemOptions): MenuItem

        /**
         * Emulate user clicking the menu item.
         */
        click(): void

        /**
         * Change the item's label.
         */
        setLabel(label: string): void

        /**
         * Return the item's label.
         */
        getLabel(): string

        /**
         * Set the submenu attached to the item.
         *
         * This method only works for `submenu` type menu items.
         */
        setSubmenu(submenu: Menu): void

        /**
         * Return the submenu attached to the item.
         */
        getSubmenu(): Menu

        /**
         * Set the `checked` state of the item.
         *
         * This method only works for `radio` and `checkbox` type menu items.
         */
        setChecked(checked: boolean): void

        /**
         * Return the `checked` state of the item.
         */
        isChecked(): boolean

        /**
         * Enable/disable the item.
         */
        setEnabled(enabled: boolean): void

        /**
         * Return whether the item is enabled.
         */
        isEnabled(): boolean

        /**
         * Show/hide the item.
         */
        setVisible(visible: boolean): void

        /**
         * Return whether the item is visible to users.
         */
        isVisible(): boolean

        /**
         * Set the `accelerator` used to activate the item.
         */
        setAccelerator(accelerator: String): void

        /**
         * Emitted when item is clicked.
         */
        onClick(self: MenuItem): any
    }

    /**
     * Horizontal bar showing progress.
     */
    class ProgressBar extends View {
        /**
         * Create a new `ProgressBar`.
         */
        static create(): ProgressBar

        /**
         * Set the percent value between `0` and `100.0`.
         */
        setValue(percent: number): void

        /**
         * Return the percent value between `0` and `100.0`.
         */
        getValue(): number

        /**
         * Set whether the progress bar is indeterminate.
         */
        setIndeterminate(indeterminate: boolean): void

        /**
         * Return whether the progress bar is indeterminate.
         */
        isIndeterminate(): boolean
    }

    /**
     * Show a part of view with scrollbar.
     *
     * The `Scroll` view can show an arbitrary content view inside it.
     *
     * When the content is larger than the `Scroll` view, scrollbars will be
     * optionally showed. When the content view is smaller then the `Scroll`
     * view, the content view will be resized to the size of the `Scroll` view.
     */
    class Scroll extends View {
        /**
         * Create a new `Scroll` view.
         */
        static create(): Scroll

        /**
         * Set the content `view`.
         */
        setContentView(view: View): void

        /**
         * Return the content `view`.
         */
        getContentView(): View

        /**
         * Set the size of content view.
         */
        setContentSize(size: SizeF): void

        /**
         * Return the size of content view.
         */
        getContentSize(): SizeF

        /**
         * Change the display policy for horizontal and vertical scrollbars.
         * @param hpolicy  Policy for horizontal scrollbar.
         * @param vpolicy Policy for vertical scrollbar.
         */
        setScrollbarPolicy(hpolicy: typeof ScrollNS.Policy, vpolicy: typeof ScrollNS.Policy): void

        /**
         * Return the display policy of horizontal and vertical scrollbars.
         */
        getScrollbarPolicy(): [typeof ScrollNS.Policy, typeof ScrollNS.Policy]
    }

    /**
     * Plain text input view.
     */
    class TextEdit extends View {
        /**
         * Create a new `TextEdit`.
         */
        static create(): TextEdit

        /**
         * Change the text in the view.
         */
        setText(text: string): void

        /**
         * Return currently displayed text.
         */
        getText(): string

        /**
         * Undo the last edit operation in the undo queue.
         */
        undo(): void

        /**
         * Return whether there are any actions in undo queue.
         */
        canUndo(): boolean

        /**
         * Redo the next action in the redo queue
         */
        redo(): void

        /**
         * Return whether there are any actions in redo queue.
         */
        canRedo(): boolean

        /**
         * Delete (cut) the current selection, if any, copy the deleted text to
         * the clipboard.
         */
        cut(): void

        /**
         * Copy current selection to clipboard.
         */
        copy(): void

        /**
         * Copy the current content of the clipboard to current caret position.
         */
        paste(): void

        /**
         * Select all text.
         */
        selectAll(): void

        /**
         * Return the start position and end position of current selection.
         *
         * If nothing is selected, (-1, -1) would be returned.
         */
        getSelectionRange(): [number, number]

        /**
         * Select text between `start` and `end` positions.
         */
        selectRange(start: number, end: number): void

        /**
         * Return the text between `start` and `end` positions.
         */
        getTextInRange(start, end): string

        /**
         * Insert `text` at current caret position.
         */
        insertText(text: string): void

        /**
         * Insert `text` at the `position`.
         */
        insertTextAt(text: string, position: number): void

        /**
         * Delete text of current selection.
         */
        delete(): void

        /**
         * Delete text between `start` and `end` positions.
         */
        deleteRange(start: number, end: number): void

        /**
         * Emitted when user has changed text.
         */
        onTextChange(self: TextEdit): any
    }

    /**
     * Window toolbar.
     *
     * This view is only implemented for macOS by wrapping `NSToolbar`.
     * @macOS
     */
    class Toolbar {
        /**
         * Create a new `Toolbar` view with `identifier`.
         *
         * Within the application all toolbars with the same identifier are
         * synchronized to maintain the same state, including for example, the
         * display mode and item order. The identifier is used as the autosave
         * name for toolbars that save their configuration.
         */
        static create(identifier: string): Toolbar

        /**
         * Set the identifiers of default items that would show in toolbar.
         * @param identifiers An array of toolbar items' identifiers.
         */
        setDefaultItemIdentifiers(identifiers: string[]): void

        /**
         * Set the identifiers of the items that are allowed to show in
         * toolbar.
         * @param identifiers An array of toolbar items' identifiers.
         */
        setAllowedItemIdentifiers(identifiers: string[]): void

        /**
         * Set whether users are allowed to customize the toolbar.
         */
        setAllowCustomization(allow: boolean): void

        /**
         * Set the display mode of the toolbar items.
         */
        setDisplayMode(mode: typeof ToolbarNS.DisplayMode): void

        /**
         * Set whether toolbar is visible.
         */
        setVisible(visible: boolean): void

        /**
         * Return whether toolbar is visible.
         */
        isVisible(): boolean

        /**
         * Return the identifier of the toolbar.
         */
        getIdentifier(): string

        /**
         * Called lazily when the toolbar is going to get the item with
         * `identifier`.
         *
         * You should not cache the item to be returned.
         */
        getItem(toolbar: Toolbar, identifier: string): ToolbarNS.Item
    }

    /**
     * Translucency view.
     *
     * This view is only implemented for macOS by wrapping
     * `NSVisualEffectView`.
     *
     * It is not possible to draw on this view, to display content on it you
     * have to add the content as child view.
     * @macOS
     */
    class Vibrant extends Container {
        /**
         * Create a new `Vibrant` view.
         */
        static create(): Vibrant

        /**
         * Set the material for the view.
         */
        setMaterial(material: typeof VibrantNS.Material): void

        /**
         * Get the material for the view.
         */
        getMaterial(): typeof VibrantNS.Material

        /**
         * Set the blending mode for the view.
         */
        setBlendingMode(mode: typeof VibrantNS.BlendingMode): void

        /**
         * Get the blending mode for the view.
         */
        getBlendingMode(): typeof VibrantNS.BlendingMode
    }

    /**
     * Base class for GUI components.
     *
     * `View` provides methods to receive and change various style properties.
     */
    class View {
        /**
         * Return offset from `view`.
         */
        offsetFromView(view: View): Vector2dF

        /**
         * Return offset from the window that owns the view.
         */
        offsetFromWindow(): Vector2dF

        /**
         * Return the position and size of the view, relative to its parent.
         */
        getBounds(): RectF

        /**
         * Make the view re-recalculate its layout.
         */
        layout(): void

        /**
         * Schedule to repaint the whole view.
         */
        schedulePaint(): void

        /**
         * Show/Hide the view.
         */
        setVisible(visible: boolean): void

        /**
         * Return whether the view is visible.
         */
        isVisible(): boolean

        /**
         * Move the keyboard focus to the view.
         */
        focus(): void

        /**
         * Return whether the view has keyboard focus.
         */
        hasFocus(): boolean

        /**
         * Set whether the view can be focused on.
         */
        setFocusable(focusable: boolean): void

        /**
         * Return whether the view can be focused on.
         */
        isFocusable(): boolean

        /**
         * Set mouse capture to the view.
         */
        setCapture(): void

        /**
         * Release mouse capture if the view has mouse capture.
         */
        releaseCapture(): void

        /**
         * Return whether the view has mouse capture.
         */
        hasCapture(): boolean

        /**
         * Set whether dragging mouse would move the window.
         *
         * For most platforms this method only works for frameless windows,
         * having this feature may also prevent mouse events to happen.
         *
         * On macOS the Container view has this feature turned on by default.
         * To turn this feature on for the view, the view's parent view must
         * also has this feature turned on.
         *
         * On Windows the view with this feature will be treated as titlebar,
         * e.g. double-clicking would maximize the window, right-clicking may
         * show the system menu.
         */
        setMouseDownCanMoveWindow(can: boolean): void

        /**
         * Return whether dragging the view would move the window.
         */
        isMouseDownCanMoveWindow(): boolean

        /**
         * Change the font used for drawing text in the view.
         *
         * This methods only works for `Views` that display text, like `Label`
         * or `Entry`.
         */
        setFont(font: Font): void

        /**
         * Change the color used for drawing text in the view.
         *
         * This methods only works for `Views` that display text, like `Label`
         * or `Entry`.
         */
        setColor(color: typeof CColor): void

        /**
         * Change the background color of the view.
         */
        setBackgroundColor(color: typeof CColor): void

        /**
         * Change the styles of the view.
         *
         * Available style properties can be found at
         * http://libyue.com/docs/v0.2.1/js/guides/layout_system.html.
         *
         * @param styles A key-value dictionary that defines the name and value
         * of the style properties.
         */
        setStyle(styles: { [x: string]: string | number }): void

        /**
         * Return the minimum size needed to show the view.
         */
        getMinimumSize(): SizeF

        /**
         * Return parent view.
         */
        getParent(): View

        /**
         * Return the window that the view belongs to.
         */
        getWindow(): Window

        /**
         * Emitted when pressing mouse buttons.
         * @preventable
         */
        onMouseDown(self: View, event: ViewNS.MouseEvent): any

        /**
         * Emitted when releasing mouse buttons.
         * @preventable
         */
        onMouseUp(self: View, event: ViewNS.MouseEvent): any

        /**
         * Emitted when user moves mouse in the view.
         */
        onMouseMove(self: View, event: ViewNS.MouseEvent): any

        /**
         * Emitted when mouse enters the view.
         */
        onMouseEnter(self: View, event: ViewNS.MouseEvent): any

        /**
         * Emitted when mouse leaves the view.
         */
        onMouseLeave(self: View, event: ViewNS.MouseEvent): any

        /**
         * Emitted when pressing keyboard.
         * @preventable
         */
        onKeyDown(self: View, event: ViewNS.KeyEvent): any

        /**
         * Emitted when releasing keyboard.
         * @preventable
         */
        onKeyUp(self: View, event: ViewNS.KeyEvent): any

        /**
         * Emitted when the view's size has been changed.
         */
        onSizeChanged(self: View): any

        /**
         * Emitted when the mouse capture on view has been released.
         */
        onCaptureLost(self: View): any
    }

    /**
     * Native window.
     */
    class Window {
        /**
         * Create a new window with `options`.
         *
         * @note doc states that this method returns a `Button`, which is
         * probably a mistake. corrected here
         */
        static create(options: createWindowOptions): Window

        /**
         * Request to close the window.
         */
        close(): void

        /**
         * Return whether window has a native frame.
         */
        hasFrame(): boolean

        /**
         * Return whether window is transparent.
         */
        isTransparent(): boolean

        /**
         * Set whether window should have shadow.
         *
         * Depending on platform, this may not work.
         */
        setHasShadow(has: boolean): void

        /**
         * Return whether window has shadow.
         */
        hasShadow(): boolean

        /**
         * Set the content view of the window.
         *
         * The content view will always be resized to fill window's client
         * area.
         */
        setContentView(view: View): void

        /**
         * Return the content view of the window.
         */
        getContentView(): View

        /**
         * Move the window to the center of the screen.
         */
        center(): void

        /**
         * Resize window to make the content view fit `size`.
         */
        setContentSize(size: SizeF): void

        /**
         * Return the size of content view.
         */
        getContentSize(): SizeF

        /**
         * Change the position and size of the window.
         */
        setBounds(bounds: RectF): void

        /**
         * Return the position and size of the window.
         */
        getBounds(): RectF

        /**
         * Set the minimum and maximum sizes of the window.
         *
         * Passing an empty size means no constraint.
         * @param minsize Minimum size.
         * @param maxsize Maximum size.
         */
        setSizeConstraints(minsize: SizeF, maxsize: SizeF): void

        /**
         * Return minimum and maximum sizes of the window.
         */
        getSizeConstraints(): [SizeF, SizeF]

        /**
         * Set the minimum and maximum content sizes of the window.
         *
         * Passing an empty size means no constraint.
         * @param minsize Minimum content size.
         * @param maxsize Maximum content size.
         */
        setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void

        /**
         * Return minimum and maximum content sizes of the window.
         */
        getContentSizeConstraints(): [SizeF, SizeF]

        /**
         * Show the window and activate it.
         */
        activate(): void

        /**
         * Move the focus away from the window.
         */
        deactivate(): void

        /**
         * Return whether window has focus.
         */
        isActive(): boolean

        /**
         * Show/hide the window.
         */
        setVisible(visible: boolean): void

        /**
         * Return whether window is visible.
         */
        isVisible(): boolean

        /**
         * Make the window always show above other normal windows.
         */
        setAlwaysOnTop(top: boolean): void

        /**
         * Return whether window is always above other normal windows.
         */
        isAlwaysOnTop(): boolean

        /**
         * Enter/leave fullscreen state.
         */
        setFullscreen(fullscreen: boolean): void

        /**
         * Return whether window is in fullscreen.
         */
        isFullscreen(): boolean

        /**
         * Maximize the window.
         */
        maximize(): void

        /**
         * Unmaximize the window.
         */
        unmaximize(): void

        /**
         * Return whether window is maximized.
         */
        isMaximized(): boolean

        /**
         * Minimize the window.
         */
        minimize(): void

        /**
         * Restore the minimized window.
         */
        restore(): void

        /**
         * Return whether window is minimized.
         */
        isMinimized(): boolean

        /**
         * Set whether window can be resized.
         */
        setResizable(resizable: boolean): void

        /**
         * Return whether window can be resized.
         */
        isResizable(): boolean

        /**
         * Set whether window can be maximize.
         */
        setMaximizable(maximizable: boolean): void

        /**
         * Return whether window can be maximize.
         */
        isMaximizable(): boolean

        /**
         * Set whether window can be minimized.
         */
        setMinimizable(minimizable: boolean): void

        /**
         * Return whether window can be minimized.
         */
        isMinimizable(): boolean

        /**
         * Set whether window can be moved.
         */
        setMovable(movable: boolean): void

        /**
         * Return whether window can be moved.
         */
        isMovable(): boolean

        /**
         * Set window title.
         */
        setTitle(title: string): void

        /**
         * Get window title.
         */
        getTitle(): string

        /**
         * Set the background color of the window.
         */
        setBackgroundColor(color: typeof CColor): void

        /**
         * Set the window toolbar.
         * @macOS
         */
        setToolbar(toolbar: Toolbar): void

        /**
         * Return the window toolbar.
         * @macOS
         */
        getToolbar(): Toolbar

        /**
         * Set whether the title is visible, when title was hidden the toolber
         * would be moved into the area previously occupied by the title.
         * @macOS
         */
        setTitleVisible(visible: boolean): void

        /**
         * Return whether title is visible.
         * @macOS
         */
        isTitleVisible(): boolean

        /**
         * Set the `NSFullSizeContentViewWindowMask` style on the window.
         * @macOS
         */
        setFullSizeContentView(full: boolean): void

        /**
         * Return whether the window has `NSFullSizeContentViewWindowMask`
         * style.
         * @macOS
         */
        isFullSizeContentView(): boolean

        /**
         * Set the window menu bar.
         * @Windows
         * @Linux
         */
        setMenuBar(menubar: MenuBar): void

        /**
         * Return the window menu bar.
         * @Windows
         * @Linux
         */
        getMenuBar(): MenuBar

        /**
         * Emitted when the window is going to be closed.
         */
        onClose(self: Window): any

        /**
         * Called when user requests to close the window, should return whether
         * the window can be closed.
         */
        shouldClose(self: Window): boolean
    }
}
