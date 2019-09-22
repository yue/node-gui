// Definitions by Kevin Gravier <kevin@mrkmg.com>

declare module "gui" {

    global {
        namespace NodeJS {
            interface ProcessVersions {
                /**
                 * Yode library version number. Is defined after the library takes control of the event loop.
                 */
                yode?: string;
            }
        }
    }

    export interface Vector2dF {
        x: number;
        y: number;
    }

    export interface PointF {
        x: number;
        y: number;
    }

    export interface SizeF {
        height: number;
        width: number;
    }

    export interface RectF {
        height: number;
        width: number;
        x: number;
        y: number;
    }

    export class App {
        protected constructor();
        static setApplicationMenu(menu: MenuBar): void;
        static getApplicationMenu(): MenuBar;
        static setDockBadgeLabel(label: string): void;
        static getDockBadgeLabel(): string;
        static getColor(name: AppThemeColor): Color;
        static getDefaultFont(): Font;
        static getClipboardType(): ClipboardDataType;
    }

    /**
     * Current Application instance.
     */
    export const app: typeof App;

    export class TableModel {
        static getRowCount(): number;
        static getValue(column: number, row: number): any;
        static setValue(column: number, row: number, value: any): void;
        static notifyRowInsertion(row: number): void;
        static notifyValueChange(column: number, row: number): void;
    }

    /**
     * This class implements the signal/slot pattern, which is used as event type.
     * 
     * Yue uses the signal/slot pattern for the event system, each event is a signal that can be connected by multiple slots, 
     * and event handlers are slots that can connect to multiple signals.
     * 
     * In Yue each signal is an instance of Signal class, while slot is just a function.
     * 
     * ```
     * const {app} = require('gui')
     * app.onReady.connect(() => console.log('on ready'))
     * ```
     * 
     * It is also possible to connect a slot to a signal by assignment, which is a shorthand of calling connect.
     * 
     * ```
     * app.onReady = () => console.log('on ready')
     * ```
     */
    export class Signal<Slot extends (...args: any) => any> {
        /**
         * Connect slot to the signal, and return an ID that can be used to disconnect it.
         * 
         * The signature of slot must match the event's type.
         */
        connect(slot: Slot): number;
        /**
         * Disconnect the id from the signal.
         */
        disconnect(id: number): void;
        /**
         * Disconnect all slots in the signal.
         */
        disconnectAll(): void
        /**
         * Return true if there is no slot connected to the signal.
         */
        isEmpty(): boolean
    }

    /**
     * Response to custom protocol requests.
     * 
     * This class can not be used to create instances, you must use its sub-classes instead.
     */
    export class ProtocolJob {

    }

    /**
     * Use string as response to custom protocol requests.
     */
    export class ProtocolStringJob extends ProtocolJob {
        /**
         * Create a [ProtocolStringJob] with mimetype and content.
         */
        static create(mimetype: string, content: string): ProtocolStringJob
    }

    /**
     * Read file to serve custom protocol requests.
     */
    export class ProtocolFileJob extends ProtocolJob {
        /**
         * Create a ProtocolFileJob with path to a local file.
         */
        static create(path: string): ProtocolFileJob
    }

    /**
     * Read asar archives to serve custom protocol requests.
     * 
     * The asar format is a simple extensive archive format, information of it can be found at https://github.com/electron/asar.
     * 
     * As an experimental feature, Yue supports reading from encrypted asar archives, which has not been a standard feature of asar yet but will probably be in future. More about this can be found at https://github.com/yue/muban.
     */
    export class ProtocolAsarJob extends ProtocolJob {
        /**
         * Create a ProtocolAsarJob with path to a file inside an asar archive.
         */
        static create(asar: string, path: string): ProtocolAsarJob
        /**
         * Set the key and iv used to read from an encrypted asar archive, return false when the key and iv are not 16 bytes length.
         * 
         * The encrypted asar archives use AES128 ECB algorithm for encryption, with PKCS#7 padding.
         */
        setDecipher(key: string, iv: string): boolean
    }

    export class BrowserOptions {
        /**
         * Whether the browser can show devtools, default is false.
         * 
         * Depending on platform, the option to show devtools is usually in the context menu, so you should also enable builtin context menu when using this option.
         * 
         * Currently this option is not working on Windows.
         */
        devtools?: boolean
        /**
         * Whether to use builtin context menu, default is false.
         * 
         * On macOS due to the limitation of system APIs, right-clicking certain elements would still popup a menu with Services items.
         */
        contextMenu?: boolean
        /**
         * macOS and Linux only. Whether file access is allowed from file URLs, default is false.
         * 
         * By default, when something is loaded in using a file URI, cross origin requests to other file resources are not allowed. This setting allows you to change that behaviour, so that it would be possible to do a XMLHttpRequest of a local file, for example.
         */
        allowFileAccessFromFiles?: boolean
        /**
         * Linux only. Whether to enable hardware acceleration, default is true.
         */
        hardwareAcceleration?: boolean
    }

    /**
     * Using Browser requires relatively new operating systems, for macOS the minimum version required is 10.10, for Linux it 
     * is required to install the webkit2gtk library with at least version 2.8.
     * 
     * On Linux due to poor support of hardware acceleration, the browser may fail to show anything, when that happens you can set 
     * WEBKIT_DISABLE_COMPOSITING_MODE environment variable to disable hardware acceleration.
     */
    export class Browser extends View {
        /**
         * Create a new browser view.
         */
        static create(options: BrowserOptions): Browser
        /**
         * Register a custom protocol with scheme and handler.
         * 
         * When the browser sends a request with scheme, the handler will be called with handler(url), and the handler must return an instance of class that inherits from ProtocolJob.
         * 
         * The handler is guaranteed to be called in the main thread.
         * 
         * Example: 
         * 
         * ```js
         * // Register wey:// protocol to work around CROS problem with file:// protocol.
         * gui.Browser.registerProtocol('wey', (u) => {
         *   const r = url.parse(u)
         *   if (r.host !== 'file')
         *      return gui.ProtocolStringJob.create('text/plain', 'Unsupported type')
         *   const query = querystring.parse(r.query)
         *   return gui.ProtocolFileJob.create(query.path)
         * })
         * ```
         */
        static registerProtocol(scheme: string, handler: (url: string) => ProtocolJob): boolean
        /**
         * Unregister the custom protocol with scheme.
         */
        static unregisterProtocol(scheme: string): void
        /**
         * Load the URL
         */
        loadURL(url: string): void
        /**
         * Set the webpage contents and base URL.
         * @param html The string to use as the contents of the webpage.
         * @param baseurl A URL used to resolve relative URLs within the document.
         */
        loadHTML(html: string, baseurl: string): void
        /**
         * Return current URL.
         */
        getURL(): string
        /**
         * Return the title of document.
         */
        getTitle(): string
        /**
         * Change browser's user agent.
         * 
         * On Windows, due to Internet Explorer's limitations, calling SetUserAgent would change all web pages' user agents in current process.
         */
        setUserAgent(userAgent: string): void
        /**
         * Evaluate code in browser and get the evaluated result.
         * 
         * The callback will be called with callback(success, result), the result argument is a generic value that created from the result of code.
         * 
         * Note that due to limitations of system toolkits, the execution may fail if the result of code can not be fully converted to JSON.
         */
        executeJavaScript<T extends any = any>(code: string, callback: (success: boolean, result: T) => void): void
        /**
         * Navigate to the back item in the back-forward list. 
         */
        goBack(): void
        /**
         * Return whether there is a back item in the back-forward list that can be navigated to.
         */
        canGoBack(): boolean
        /**
         * Navigate to the forward item in the back-forward list.
         */
        goForward(): void
        /**
         * Return whether there is a forward item in the back-forward list that can be navigated to.
         */
        canGoForward(): boolean
        /**
         * Reload current page.
         */
        reload(): void
        /**
         * Stop loading all resources on the current page.
         */
        stop(): void
        /**
         * Return whether current page is loading content.
         */
        isLoading(): boolean
        /**
         * Add a native binding to web page with name.
         * 
         * The func will be called with automatically converted arguments.
         */
        addBinding(name: string, func: (...args: any[]) => any): void
        /**
         * Add a raw handler to web page with name.
         * 
         * The func will be called with a list of arguments passed from JavaScript.
         */
        addRawBinding(name: string, func: (...args: any[]) => any): void
        /**
         * Set the name of object which would have the native bindings.
         * 
         * By default native bindings are added to the window object, by calling this API, 
         * native bindings will be added to the window[name] object.
         */
        setBindingName(name: string): void
        /**
         * Remove the native binding with name.
         */
        removeBinding(name: string): void
    }

    /**
     * Provides methods to receive and change various style properties.
     */
    export class View {
        protected constructor();
        /**
         * Cancel current drag session if the view is being used as drag source.
         */
        cancelDrag(): void;
        /**
         * Like [doDragWithOptions] but do not set drag image.
         */
        doDrag(data: ClipboardData[], operations: DragOperation): number;
        /**
         * Start a drag session.
         * 
         * The return value is a DragOperation indicating the result of dragging.
         * 
         * This method should only be called in the on_mouse_down event, when user starts to drag the cursor.
         * 
         * This method is blocking that it does not return until the drag session is finished or cancelled. During the call a nested UI message loop will run and other events will still be emitted.
         * 
         * Note that on macOS certain views may have `isMouseDownCanMoveWindow` defaulting to true, which will prevent drag session to start. Make sure to call `SetMouseDownCanMoveWindow(false)` for drag sources.
         * @param data  An array of [ClipboardData] that will be passed to drop target.
         * @param operations  Must be one or more of [DragOperation] masks, indicates which drag operations are supported.
         */
        doDragWithOptions(data: ClipboardData[], operations: DragOperation, options: DragOptions): number;
        /**
         * Move the keyboard focus to the view.
         */
        focus(): void;
        /**
         * Return the position and size of the view, relative to its parent.
         */
        getBounds(): RectF;
        /**
         * Return string representation of the view's layout.
         */
        getComputedLayout(): string;
        /**
         * Return the minimum size needed to show the view.
         */
        getMinimumSize(): SizeF;
        /**
         * Return parent view.
         */
        getParent(): View;
        /**
         * Return the window that the view belongs to.
         */
        getWindow(): Window;
        /**
         * Called when user drags the cursor over the view for the first time.
         * 
         * A DragOperation should be returned, indicating which dragging operation the destination will perform when cursor is released.
         * 
         * This delegate will not be called if the view has not registered dragged types, or if the dragged data does not belong to the registered type.
         * 
         * On Linux the dragged data is not yet available when this is called, you should usually only read data in the handle_drop delegate.
         */
        handleDragEnter(self: this, info: DraggingInfo, point: PointF): DragOperation;
        /**
         * Called when user moves the cursor over the view while dragging.
         * 
         * A DragOperation should be returned, indicating which dragging operation the destination will perform when cursor is released.
         * 
         * If this delegate is not implemented, the return value of previous handle_drag_enter call will be returned.
         * 
         * This delegate is usually used when implementing a custom view with multiple dropping areas, you only need to implement handle_drag_enter for simple tasks.
         * 
         * On Linux the dragged data is not yet available when this is called, you should usually only read data in the handle_drop delegate. 
         */
        handleDragUpdate(self: this, info: DraggingInfo, point: PointF): DragOperation;
        /**
         * Called when user releases the dragged data on the view.
         * 
         * Returning true will inform the drag source that the data has been accepted with the drag operation returned by previous handle_drag_enter or handle_drag_update call.
         * 
         * If the drag operation is Move, the drag source may also take actions to "remove" the data on its side.
         * 
         * Returning false will inform the drag source that the drag has been cancelled, and operating system may display some visual effects. 
         */
        handleDrop(self: this, info: DraggingInfo, point: PointF): boolean;
        /**
         * Return whether the view has mouse capture.
         */
        hasCapture(): boolean;
        /**
         * Return whether the view has keyboard focus.
         */
        hasFocus(): boolean;
        /**
         * Return whether the view is being used as drag source.
         */
        isDragging(): boolean;
        /**
         * Return whether the view is enabled.
         */
        isEnabled(): boolean;
        /**
         * Return whether the view can be focused on.
         */
        isFocusable(): boolean;
        /**
         * Return whether dragging the view would move the window.
         */
        isMouseDownCanMoveWindow(): boolean;
        /**
         * Return whether the view is visible.
         */
        isVisible(): boolean;
        /**
         * Make the view re-recalculate its layout.
         */
        layout(): void;
        /**
         * Return offset from view
         */
        offsetFromView(view: View): Vector2dF;
        /**
         * Return offset from the window that owns the view.
         */
        offsetFromWindow(): Vector2dF;
        /**
         * Emitted when the mouse capture on view has been released.
         */
        onCaptureLost: Signal<(self: this) => void> | ((self: this) => void)
        // onCaptureLost(self: this): void;
        /**
         * Emitted when cursor leaves the view while dragging. 
         * 
         * This event will also be emitted before the handle_drop event when user drops the data on the view.
         */
        onDragLeave: Signal<(self: this, event: DraggingInfo) => void> | ((self: this, event: DraggingInfo) => void)
        // onDragLeave(self: this, info: DraggingInfo): void;
        /**
         * Emitted when pressing keyboard.
         */
        onKeyDown: Signal<(self: this, event: KeyEvent) => boolean | void> | ((self: this, event: KeyEvent) => boolean | void)
        // onKeyDown(self: this, event: KeyEvent): boolean|void;
        /**
         * Emitted when releasing keyboard.
         */
        onKeyUp: Signal<(self: this, event: KeyEvent) => boolean | void> | ((self: this, event: KeyEvent) => boolean | void)
        // onKeyUp(self: this, event: KeyEvent): boolean|void;
        /**
         * Emitted when pressing mouse buttons.
         */
        onMouseDown: Signal<(self: this, event: MouseEvent) => boolean | void> | ((self: this, event: MouseEvent) => boolean | void)
        // onMouseDown(self: this, event: MouseEvent): boolean|void;
        /**
         * Emitted when mouse enters the view.
         */
        onMouseEnter: Signal<(self: this, event: MouseEvent) => boolean | void> | ((self: this, event: MouseEvent) => boolean | void)
        // onMouseEnter(self: this, event: MouseEvent): boolean|void;
        /**
         * Emitted when mouse leaves the view.
         */
        onMouseLeave: Signal<(self: this, event: MouseEvent) => boolean | void> | ((self: this, event: MouseEvent) => boolean | void)
        // onMouseLeave(self: this, event: MouseEvent): boolean|void;
        /**
         * Emitted when user moves mouse in the view.
         */
        onMouseMove: Signal<(self: this, event: MouseEvent) => boolean | void> | ((self: this, event: MouseEvent) => boolean | void)
        // onMouseMove(self: this, event: MouseEvent): boolean|void;
        /**
         * Emitted when releasing mouse buttons.
         */
        onMouseUp: Signal<(self: this, event: MouseEvent) => boolean | void> | ((self: this, event: MouseEvent) => boolean | void)
        // onMouseUp(self: this, event: MouseEvent): void;
        /**
         * Emitted when the view's size has been changed.
         */
        onSizeChanged: Signal<(self: this) => void> | ((self: this) => void)
        // onSizeChanged(self: this): void;
        /**
         * Make the view a drag destination that accepets types.
         */
        registerDraggedTypes(types: ClipboardDataType[]): void;
        /**
         * Release mouse capture if the view has mouse capture.
         */
        releaseCapture(): void;
        /**
         * Schedule to repaint the whole view.
         */
        schedulePaint(): void;
        /**
         * Schedule to repaint the rect area in view.
         */
        schedulePaintRect(rect: RectF): void;
        /**
         * Change the background color of the view.
         */
        setBackgroundColor(color: ColorArg): void;
        /**
         * Set mouse capture to the view.
         */
        setCapture(): void;
        /**
         * Change the color used for drawing text in the view.
         * 
         * This methods only works for Views that display text, like Label or Entry.
         */
        setColor(color: ColorArg): void;
        /**
         * Set the cursor to show when hovering the view.
         * 
         * On Linux, setting cursor would force the view to own its own GDK window. For certain views like Label, this may have remove the view's background color.
         */
        setCursor(cursor: Cursor): void;
        /**
         * Set whether the view is enabled.
         * 
         * The enabled state of each view is not affected by its parent, disabling a container-like view does not have any effect.
         */
        setEnabled(isEnabled: boolean): void;
        /**
         * Set whether the view can be focused on.
         */
        setFocusable(isFocusable: boolean): void;
        /**
         * Change the font used for drawing text in the view.
         * 
         * This methods only works for Views that display text, like Label or Entry.
         */
        setFont(font: Font): void;
        /**
         * Set whether dragging mouse would move the window.
         * 
         * For most platforms this method only works for frameless windows, having this feature may also prevent mouse events to happen.
         * 
         * On macOS the Container view has this feature turned on by default. To turn this feature on for the view, the view's parent view must also has this feature turned on.
         * 
         * On Windows the view with this feature will be treated as titlebar, e.g. double-clicking would maximize the window, right-clicking may show the system menu.
         */
        setMouseDownCanMoveWindow(can: boolean): void;
        /**
         * Change the styles of the view. 
         * 
         * ## Layout system
         * 
         * Yue uses Facebook [Yoga](https://facebook.github.io/yoga/) as layout engine, which provides Flexbox style layout system.
         * 
         * Yue does not support CSS itself, it only uses the concept of Flexbox for layout, and you have to manually set style for each View.
         * 
         * ```js
         * view.setStyle({flexDirection: 'column', flex: 1})
         * ```
         * 
         * It should be noted that not all CSS properties are supported, and there is no plan for support of tables, floats, or similar CSS concepts.
         * 
         * ## View and Container
         * 
         * In Yue all widgets are inherited from the virtual class View, which represents a leaf node in the layout system. The Container is a View that can have multiple child Views, in the layout system the child Views of Container are treated as child nodes.
         * 
         * There are Views that can have content view like Group or Scroll, but their content views are treated as root nodes in layout system, instead of being child nodes of their parents.
         * 
         * Following code is an example of list view.
         * 
         * ```js
         * const listView = gui.Scroll.create()
         * const contentView = gui.Container.create()
         * contentView.setStyle({flexDirection: 'column'})
         * for (let i = 0; i < 100; ++i) {
         *   const item = gui.Label.create(String(i))
         *   const g = Math.floor(155 / 100 * i + 100)
         *   item.setBackgroundColor(gui.Color.rgb(100, g, 100))
         *   contentView.addChildView(item)
         * }
         * listView.setContentSize(contentView.getPreferredSize())
         * listView.setContentView(contentView)
         * ```
         * 
         * ## Style properties
         * 
         * For a complete list of supported style properties, it is recommended to read the [documentation of Yoga](https://yogalayout.com/docs).
         * 
         * Yoga style properties mapping in this library are defined in [/nativeui/util/yoga_util.cc](https://github.com/yue/yue/blob/master/nativeui/util/yoga_util.cc).
         * 
         * @param styles A key-value dictionary that defines the name and value of the style properties, key must be string, and value must be either string or number.
         */
        setStyle(styles: StyleProperties): void;
        /**
         * Show/Hide the view.
         */
        setVisible(isVisible: boolean): void;
    }

    export interface CreateButtonOptions {
        title: string;
        type: ButtonType;
    }

    export class Button extends View {
        static create(title: string): Button;
        static create(options: CreateButtonOptions): Button;
        protected constructor();
        getButtonStyle(): ButtonStyle;
        getImage(): Image;
        getTitle(): string;
        hasBoarder(): boolean;
        isChecked(): boolean;
        // onClick(self: this): void;
        onClick: Signal<(self: this) => void> | ((self: this) => void)
        setButtonStyle(style: ButtonStyle): void;
        setChecked(isChecked: boolean): void;
        setHasBoarder(hasBoarder: boolean): void;
        setImage(image: Image): void;
        setTitle(title: string): void;
    }

    export class Canvas {
        /**
         * Create a new canvas with specified size and scale factor.
         */
        static create(size: SizeF, scaleFactor: number): Canvas;
        /**
         * Create a new canvas with size using default scale factor.
         * This is strongly discouraged for using, since it does not work well with multi-monitor setup. Only use it when you do not care about per-monitor DPI.
         */
        static createForMainScreen(size: SizeF): Canvas;
        protected constructor();
        /**
         * Return the Painter that can be used to draw on the canvas.
         */
        getPainter(): Painter;
        /**
         * Return the scale factor of the canvas.
         */
        getScaleFactor(): number;
        /**
         * Return the DIP size of canvas.
         */
        getSize(): SizeF;
    }

    export class Clipboard {
        protected constructor();
        clear(): void;
        getData(type: ClipboardDataType): ClipboardData;
        getText(): string;
        isDataAvailable(type: ClipboardDataType): boolean;
        setData(objects: ClipboardData[]): void;
        setText(text: string): void;
    }

    export class Color {
        protected constructor();
        static rgb(r: number, g: number, b: number): Color;
        static argb(a: number, r: number, g: number, b: number): Color;
    }

    type ColorArg = Color | string;

    export class ComboBox extends Picker {
        static create(): ComboBox;
        protected constructor();
        getText(): string;
        onTextChange(self: this): void;
        setText(text: string): void;
    }

    type EventMember<T extends (...args: any[]) => any> = Signal<T> | T;

    export class Container extends View {
        /**
         * Create a new container view.
         */
        static create(): Container;
        protected constructor();
        /**
         * Append a child view to the container.
         * 
         * This method will silently fail if the view already has a parent.
         */
        addChildView(view: View): void;
        /**
         * Add a child view to the container at index.
         * 
         * This method will silently fail if the view already has a parent. 
         */
        addChildViewAt(view: View, index: number): void;
        /**
         * Return the child view at index.
         * 
         * This method will silently fail if the index is out of range.
         */
        childAt(index: number): View;
        /**
         * Return the count of children in the container.
         */
        childCount(): number;
        /**
         * Return the minimum height to show all child of the view for the width.
         */
        getPreferredHeightForWidth(width: number): number;
        /**
         * Get the minimum size to show all children of the view. 
         * 
         * Note that if the view is using a flex-wrap: wrap style, this method might return a extremely wide/high size since it does not know the best width/height to show the children.
         */
        getPreferredSize(): SizeF;
        /**
         * Return the minimum width to show all child of the view for the height.
         */
        getPreferredWidthForHeight(height: number): number;
        /**
         * Emitted when button the operating system or application requests to draw a portion of the view.
         * 
         * The call must be synchronous. Calling given painter asynchronously ehavior is undefined.
         * @param painter The drawing context of the view.
         * @param dirty  The area in the view to draw on.
         */
        onDraw: EventMember<(self: this, painter: Painter, dirty: RectF) => void>
        // onDraw(self: this, painter: Painter, dirty: RectF): void;
        /**
         * Remove a child view from this container.
         * 
         * This method will silently fail if the view is not a child of the container.
         */
        removeChildView(view: View): void;
    }

    export class Cursor {
        protected constructor();
        static createWithType(type: CursorType): Cursor;
    }

    /**
     * Single-line text input view.
     */
    export class Entry extends View {
        /**
         * Create a normal Entry
         */
        static create(): Entry;
        /**
         * Create an Entry with type.
         */
        static createType(type: EntryType): Entry;
        protected constructor();
        /**
         * Return currently displayed text.
         */
        getText(): string;
        /**
         * Emitted when user has pressed Enter in the view.
         */
        onActivate: EventMember<(self: this) => void>
        /**
         * Emitted when user has changed text.
         */
        onTextChange: EventMember<(self: this) => void>;
        /**
         * Change the text in the view.
         */
        setText(text: string): void;
    }

    export class FileDialog {
        protected constructor();
        static optionMultiSelect: number;
        static optionPickFolders: number;
        static optionShowHidden: number;
        getResult(): string;
        run(): boolean;
        runForWindow(window: Window): boolean;
        setButtonLabel(label: Label): void;
        setFilters(filters: FileDialogFilter[]): void;
        setFolder(folder: string): void;
        setOptions(options: number): void;
        setTitle(title: string): void;
        setFilename(filename: string): void;
    }

    export class FileOpenDialog extends FileDialog {
        protected constructor();
        getResults(): string[];
        static create(): FileOpenDialog;
    }

    export class FileSaveDialog extends FileDialog {
        protected constructor();
        static create(): FileSaveDialog;
    }

    export class Font {
        static create(name: string, size: number, weight: FontWeight, style: FontStyle): Font;
        static default(): Font;
        protected constructor();
        derive(sizeDetla: number, weight: FontWeight, style: FontStyle): Font;
        getName(): string;
        getSize(): number;
        getStyle(): FontStyle;
        getWeight(): FontWeight;
    }

    export class GifPlayer extends View {
        static create(): GifPlayer;
        protected constructor();
        getImage(): Image;
        isAnimating(): boolean;
        setAnimating(isAnimating: boolean): void;
        setImage(image: Image): void;
    }

    export class Group extends View {
        static create(title: string): Group;
        protected constructor();
        getContentView(): View;
        getTitle(): string;
        setContentView(view: View): void;
        setTitle(title: string): void;
    }

    export class Image {
        static createEmpty(): Image;
        /**
         * Creates an image from given buffer containing an image encoded with a supported format like jpg or png. 
         * 
         * Any ArrayBuffer, Node's Buffer or views (like UInt8Array) can be passed, example:
         * 
         * ```let image = gui.Image.createFromBuffer(readFileSync('lenna.jpg'), 1)```
         * 
         */
        static createFromBuffer(buffer: ArrayBuffer | ArrayBufferView, scaleFactor: number): Image;
        static createFromPath(path: string): Image;
        protected constructor();
        getScaleFactor(): number;
        getSize(): SizeF;
    }

    export class Label extends View {
        static create(text: string): Label;
        protected constructor();
        getText(): string;
        setAlign(align: TextAlign): void;
        setText(text: string): void;
        setVAlign(align: TextAlign): void;
    }
    /**
     * This class does system GUI toolkit intializations, and provides APIs around native GUI toolkit's application lifetime APIs. You should not use this API when integrating Yue into existing GUI apps.
     * 
     * When using this class, you must create Lifetime before creating State.
     */
    export class Lifetime {
        /**
         * MacOs only. Emitted when received applicationShouldHandleReopen notification and there is no visible windows. This usually happens when the app is activated by Finder, or user clicks on the dock icon.
         */
        onActivate: EventMember<() => void>
        /**
         * MacOs only. Emitted when received applicationDidFinishLaunching notification.
         */
        onReady: EventMember<() => void>
    }

    export interface MenuItemOptions {
        accelerator?: Accelerator;
        checked?: boolean;
        enabled?: boolean;
        label?: string;
        onClick?: (menuItem: MenuItem) => void;
        role?: MenuItemRole;
        submenu?: MenuItemOptions[];
        type?: MenuItemType;
        visible?: boolean;
    }

    export class MenuItem {
        static create(type: MenuItemType): MenuItem;
        static create(options: MenuItemOptions): MenuItem;
        protected constructor();
        click(): void;
        getLabel(): string;
        getSubmenu(): Menu;
        isChecked(): boolean;
        isEnabled(): boolean;
        isVisible(): boolean;
        onClick(self: this): void;
        setAccelerator(accelerator: Accelerator): void;
        setChecked(isChecked: boolean): void;
        setEnabled(isEnabled: boolean): void;
        setLabel(label: string): void;
        setSubmenu(submenu: Menu): void;
        setVisible(isVisible: boolean): void;
    }

    export class MenuBase {
        append(item: MenuItem): void;
        insert(item: MenuItem, index: number): void;
        itemAt(index: number): MenuItem;
        itemCount(): number;
        remove(item: MenuItem): void;
    }

    export class Menu extends MenuBase {
        protected constructor();
        popup(): void;
        static create(items: MenuItemOptions[]): Menu;
    }

    export class MenuBar extends MenuBase {
        protected constructor();
        static create(items: MenuItemOptions[] | MenuItem[]): MenuBar;
    }

    export class MessageLoop {
        static run(): void;
        static quit(): void;
        static postTask(task: Function): void;
        static postDelayedTask(ms: number, task: Function): void;
    }

    /**
     * The Painter class can not be created by user, its instance can only be recevied in drawing events or via the Canvas class.
     */
    export class Painter {
        /**
         * Add an arc to the path which is centered at point with radius starting at sa angle and ending at ea angle going in clockwise direction.
         * @param point Arc's center.
         * @param radius Arc's radius.
         * @param sa The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
         * @param ea  The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
         */
        arc(point: PointF, radius: number, sa: number, ea: number): void;
        beginPath(): void;
        /**
         * Add a cubic Bézier curve to current path.
         * 
         * The first two points are control points and the third one is the end point. The starting point is the last point in the current path.
         */
        bezierCurveTo(cp1: PointF, cp2: PointF, ep: PointF): void;
        clip(): void;
        /**
         * Set the color used for shapes' outlines.
         */
        setStrokeColor(color: ColorArg): void;
        /**
         * Set the color used when filling shapes.
         */
        setFillColor(color: ColorArg): void;
        clipRect(rect: RectF): void;
        /**
         * Close current path and move current point to the start of current path.
         * 
         * A straight line will be drew from current point to the start.
         */
        closePath(): void;
        drawCanvas(canvas: Canvas, rect: RectF): void;
        drawCanvasFromRect(canvas: Canvas, src: RectF, dest: RectF): void;
        drawImage(image: Image, rect: RectF): void;
        drawImageFromRect(image: Image, src: RectF, dest: RectF): void;
        drawText(text: string, rect: RectF, attributes: TextAttributes): void;
        fill(): void;
        fillRect(rect: RectF): void;
        lineTo(point: PointF): void;
        measureText(text: string, width: number, attributes: TextAttributes): void;
        moveTo(point: PointF): void;
        rect(rect: RectF): void;
        /**
         * Restore the most recently saved state.
         */
        restore(): void;
        rotate(angle: number): void;
        /**
         * Save the entire state of the painter.
         */
        save(): void;
        scale(scale: Vector2dF): void;
        setColor(color: ColorArg): void;
        setLineWidth(width: number): void;
        stroke(): void;
        strokeRect(rect: RectF): void;
        translate(offset: Vector2dF): void;
    }

    export class Picker extends View {
        static create(): Picker;
        protected constructor();
        addItem(title: string): void;
        getItems(): string[];
        getSelectedItem(): string;
        getSelectedItemIndex(): number;
        onSelectionChanged(self: this): void;
        removeItemAt(index: number): void;
        selectItemAt(index: number): void;
    }

    export class ProgressBar extends View {
        static create(): ProgressBar;
        protected constructor();
        getValue(): number;
        isIndeterminate(): boolean;
        setIndeterminate(isIndeterminate: boolean): void;
        setValue(percent: number): void;
    }

    /**
     * The Scroll view can show an arbitrary content view inside it.
     * 
     * When the content is larger than the Scroll view, scrollbars will be optionally showed. When the content view is smaller then the Scroll view, the content view will be resized to the size of the Scroll view.
     */
    export class Scroll extends View {
        static create(): Scroll;
        protected constructor();
        getContentSize(): SizeF;
        getContentView(view: View): void;
        getScrollbarPolicy(): [ScrollPolicy, ScrollPolicy];
        /**
         * MacOS only. Return whether overlay scrolling is used.
         */
        isOverlayScrollbar(): boolean;
        setContentSize(size: SizeF): void;
        setContentView(view: View): void;
        /**
         * MacOS only. Set whether to use overlay scrolling.
         */
        setOverlayScrollbar(overlay: boolean): void;
        setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;
    }

    export class SimpleTableModel extends TableModel {
        protected constructor();
        addRow(row: any[]): void;
        removeRowAt(index: number): void;
        static create(columns: number): SimpleTableModel;
    }

    export class Slider extends View {
        static create(): Slider;
        protected constructor();
        getRange(): [number, number];
        getValue(): number;
        onSlidingComplete(self: this): void;
        onValueChange(self: this): void;
        setRange(min: number, max: number): void;
        setStep(step: number): void;
        setValue(value: number): void;
    }

    export class Tab extends View {
        static create(): Tab;
        protected constructor();
        addPage(title: string, view: View): void;
        getSelectedPage(): View;
        getSelectedPageIndex(): number;
        onSelectedPageChange(self: this): void;
        pageAt(index: number): View;
        pageCount(): number;
        removePage(view: View): void;
        selectPageAt(index: number): void;
    }

    export class Table extends View {
        static create(): Table;
        protected constructor();
        addColumn(title: string): void;
        addColumnWithOptions(title: string, options: TableColumnOptions): void;
        getColumnCount(): number;
        getModel(): TableModel;
        getRowHeight(): number;
        getSelectedRow(): number;
        isColumnsVisible(): void;
        selectRow(row: number): void;
        setColumnsVisible(isColumnsVisible: boolean): void
        setModel(model: TableModel): void;
        setRowHeight(height: number): void;
    }

    export class TextEdit extends View {
        static create(): TextEdit;
        protected constructor();
        canRedo(): boolean;
        canUndo(): boolean;
        copy(): void;
        cut(): void;
        delete(): void;
        deleteRange(start: number, end: number): void;
        getSelectionRange(): [number, number];
        getText(): string;
        getTextBounds(): RectF;
        getTextInRange(start: number, end: number): string;
        insertTextAt(text: string, position: number): void;
        onTextChange(self: this): void;
        paste(): void;
        redo(): void;
        selectAll(): void;
        selectRange(start: number, end: number): void;
        setOverlayScrollbar(overlay: boolean): void;
        setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;
        setText(text: string): void;
        shouldInsertNewLine(self: this): true;
        undo(): void;
    }

    export type ToolbarItem = "default" | "icon-and-label" | "icon" | "label";

    export class Toolbar {
        static create(identifier: string): Toolbar;
        protected constructor();
        getIdentifier(): string;
        getItem(toolbar: any, identifier: string): ToolbarItem;
        isVisible(): boolean;
        setAllowCustomization(allow: boolean): void;
        setAllowedItemIdentifiers(identifiers: string[]): void;
        setDefaultItemIdentifiers(identifiers: string[]): void;
        setDisplayMode(mode: ToolbarDisplayMode): void;
        setVisible(visible: boolean): void;
    }

    export class Tray {
        static createWithImage(icon: Image): Tray;
        static createWithTitle(title: string): Tray;
        protected constructor();
        getMenu(): Menu;
        onClick(self: this): void;
        setImage(icon: Image): void;
        setMenu(menu: Menu): void;
        setTitle(title: string): void;
    }

    export type VibrantMaterial =
        "appearance-based" |
        "light" |
        "dark" |
        "titlebar";

    export type VibrantBlendingMode =
        "behind-window" |
        "within-window";

    export class Vibrant extends Container {
        static create(): Vibrant;
        protected constructor();
        getBlendingMode(): VibrantBlendingMode;
        getMaterial(): VibrantMaterial;
        setBlendingMode(mode: VibrantBlendingMode): void;
        setMaterial(material: VibrantMaterial): void;
    }

    export class Window {
        /**
         * Create a new window with options.
         */
        static create(options: WindowOptions): Window;
        protected constructor();
        activate(): void;
        addChildWindow(window: Window): void;
        /**
         * Move the window to the center of the screen.
         */
        center(): void;
        /**
         * Request to close the window.
         */
        close(): void;
        /**
         * Move the focus away from the window.
         */
        deactivate(): void;
        getBounds(): RectF;
        getChildWindows(): Window[];
        getContentSize(): SizeF;
        getContentSizeConstraints(): [SizeF, SizeF];
        getContentView(): View;
        getMenuBar(): MenuBar;
        getParentWindow(): Window;
        getTitle(): string;
        /**
         * MacOs only. Set the window toolbar.
         */
        getToolbar(): Toolbar;
        /**
         * Return whether window has a native frame.
         */
        hasFrame(): boolean;
        hasShadow(): boolean;
        isActive(): void;
        /**
         * Return whether window is always above other normal windows.
         */
        isAlwaysOnTop(): boolean;
        isFullscreen(): boolean;
        isFullSizeContentView(): boolean;
        isMaximizable(): boolean;
        isMaximized(): boolean;
        isMinimizable(): boolean;
        isMinimized(): boolean;
        isMovable(): boolean;
        isResizeable(): boolean;
        isTitleVisible(): boolean;
        /**
         * Return whether window is transparent.
         */
        isTransparent(): boolean;
        isVisible(): boolean;
        /**
         * Maximize the window.
         */
        maximize(): void;
        minimize(): void;
        onBlur(self: this): void;
        onClose(self: this): void;
        onFocus(self: this): void;
        removeChildWindow(window: Window): void;
        restore(): void;
        /**
         * Make the window always show above other normal windows.
         */
        setAlwaysOnTop(isAlwaysOnTop: boolean): void;
        setBackgroundColor(color: ColorArg): void;
        setBounds(bounds: RectF): void;
        setContentSize(size: SizeF): void;
        /**
         * Set the minimum and maximum content sizes of the window.
         * 
         * Passing an empty size means no constraint.
         * @param minsize  Minimum content size.
         * @param maxsize  Maximum content size.
         */
        setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void;
        setContentView(view: View): void;
        setFullscreen(isFullscreen: boolean): void;
        setFullSizeContentView(full: boolean): void;
        /**
         * Set whether window should have shadow.
         * 
         * Depending on platform, this may not work.
         */
        setHasShadow(hasShadow: boolean): void;
        setMaximizable(isMaximizable: boolean): void;
        setMenuBar(menubar: MenuBar): void;
        setMinimizable(isMinimizable: boolean): void;
        setMovable(isMovable: boolean): void;
        setResizable(isResizable: boolean): void;
        setSizeConstrains(minsize: SizeF, maxsize: SizeF): void;
        setTitle(title: string): void;
        setTitleVisible(visible: boolean): void;
        /**
         * MacOs only. Set the window toolbar.
         */
        setToolbar(toolbar: Toolbar): void;
        /**
         * Show/hide the window.
         */
        setVisible(isVisible: boolean): void;
        /**
         * Called when user requests to close the window, should return whether the window can be closed.
         */
        shouldClose(self: this): boolean;
        /**
         * Unmaximize the window.
         */
        unmaximize(): void;
    }

    export type Accelerator = string;

    export type AppThemeColor = "text" | "disabled-text";

    export interface BrowserOptions {
        /**
         * MacOS and Linux only. Whether file access is allowed from file URLs, default is false.
         * 
         * By default, when something is loaded in using a file URI, cross origin requests to other file resources are not allowed. 
         * 
         * This setting allows you to change that behaviour, so that it would be possible to do a XMLHttpRequest of a local file, for example.
         */
        allowFileAccessFromFiles?: boolean;
        /**
         * Whether to use builtin context menu, default is false.
         * 
         * On macOS due to the limitation of system APIs, right-clicking certain elements would still popup a menu with Services items.
         */
        contextMenu?: boolean;
        /**
         * Whether the browser can show devtools, default is false. 
         * 
         * Depending on platform, the option to show devtools is usually in the context menu, so you should also enable builtin context menu when using this option. 
         * 
         * Currently this option is not working on Windows.
        */
        devtools?: boolean;
        /**
         * Linux only. Whether to enable hardware acceleration, default is true.
         */
        hardwareAcceleration?: boolean;
    }

    export type ButtonStyle =
        "rounded" |
        "regular-square" |
        "thick-square" |
        "thicker-square" |
        "disclosure" |
        "shadowless-square" |
        "circular" |
        "textured-square" |
        "help-button" |
        "small-square" |
        "textured-rounded" |
        "round-rect" |
        "recessed" |
        "rounded-disclosure" |
        "inline";

    export type ButtonType = "normal" | "checkbox" | "radio";

    export type ClipboardDataType = "text" | "html" | "image" | "file-paths" | "none";

    type ClipboardDataText = { type: "text", value: string };
    type ClipboardDataHtml = { type: "html", value: string };
    type ClipboardDataImage = { type: "image", value: Image };
    type ClipboardDataFilePaths = { type: "file-paths", value: string[] };
    type ClipboardDataNone = { type: "none", value: null };

    export type ClipboardData =
        ClipboardDataText |
        ClipboardDataHtml |
        ClipboardDataImage |
        ClipboardDataFilePaths |
        ClipboardDataNone;

    export type CursorType =
        "default" |
        "hand" |
        "crosshair" |
        "progress" |
        "text" |
        "not-allowed" |
        "help" |
        "move" |
        "resize-ew" |
        "resize-ns" |
        "resize-nesw" |
        "resize-nwse";

    export type DragOperation = number;

    export class DraggingInfo {
        static dragOperationCopy: number;
        static dragOperationMove: number;
        static dragOperationNone: number;
        getData(type: ClipboardDataType): boolean;
        getDragOperations(): number
        isDataAvailable(type: ClipboardDataType): boolean;
    }

    export interface DragOptions {
        image: Image;
    }

    export type EntryType = "normal" | "password";

    /**
     * Represent possible event types. EventType is an enum with following values: 'unknown'| 'mouseDown'| 'mouseUp'| 'mouseMove'| 'mouseEnter'| 'mouseLeave'| 'keyDown'
     */
    export type EventType = 'unknown' | 'mouseDown' | 'mouseUp' | 'mouseMove' | 'mouseEnter' | 'mouseLeave' | 'keyDown'

    export class Event {
        static maskAlt: number;
        static maskControl: number;
        static maskMeta: number;
        static maskShift: number;
        modifiers: number;
        timestamp: number;
        type: EventType;
        isAltPressed(): boolean;
        isControlPressed(): boolean;
        isMetaPressed(): boolean;
        isShiftPressed(): boolean;
    }

    export interface FileDialogFilter {
        description: string;
        extensions: string[];
    }

    export type FontStyle = "normal" | "italic";

    export type FontWeight =
        "thin" |
        "extra-light" |
        "light" |
        "normal" |
        "medium" |
        "semi-bold" |
        "bold" |
        "extra-bold" |
        "black";

    export type KeyboardCode = string;

    export class KeyEvent extends Event {
        key: KeyboardCode;
    }

    /**
     * Preset defaults for common menu items.
     * 
     * For common menu items like Copy and Paste, manually implementing them for all platforms is very boring work. You can instead specify a role for a menu item, and Yue will automatically set labels, accelerators and actions for the menu item.
     * 
     * This type is a string with following possible values:"copy", "cut", "paste", "select-all", "undo", "redo". 
     * 
     * On macOS following values are also available: "about", "hide", "hide-others", "unhide", "help", "window"

     */
    export type MenuItemRole =
        "copy" |
        "cut" |
        "paste" |
        "select-all" |
        "undo" |
        "redo" |
        "about" |
        "hide" |
        "hide-others" |
        "unhide" |
        "help" |
        "window" |
        "services";

    /**
     * Represent possible Menuitem types.
     */
    export type MenuItemType =
        "label" |
        "checkbox" |
        "radio" |
        "separator" |
        "submenu";

    export class MouseEvent extends Event {
        button: 1 | 2 | 3;
        positionInView: PointF;
        positionInWindow: PointF;
    }

    export type ScrollPolicy = "always" | "never" | "automatic";

    export interface TableColumnOptions {
        column?: number;
        onDraw?: (painter: Painter, rect: RectF, value: any) => void;
        type?: TableColumnType;
        width?: number;
    }

    export type TableColumnType = "text" | "edit" | "custom";
    export type TextAlign = "start" | "center" | "end";

    /**
     * By default text is drew at top-left corner using system font and color.
     */
    export interface TextAttributes {
        /**
         * Horizontal text align, default is to the start of layout.
         */
        align?: TextAlign;
        /**
         * Text color, default is system UI text color.
         */
        color?: ColorArg;
        /**
         * Whether to show ellipsis (...) at the end of the last visible line if the text doesn't fit into the bounds specified, default is false.
         * 
         * The text is broken at the boundary of the last character.
         * 
         * On Linux, ellipsis does not have effect if wrap is false.
         */
        ellipsis?: boolean;
        /**
         * Font for drawing text, default is system UI font.
         */
        font?: Font;
        /**
         * Vertical text align, default is to the start of layout.
         */
        valign?: TextAlign;
        /**
         * Whether to wrap lines, default is true.
         * 
         * Lines are wrapped at word boundaries.
         */
        wrap?: boolean;
    }

    export interface TextMetrics {
        size: SizeF;
    }

    export type ToolbarDisplayMode = "default" | "icon-and-label" | "icon" | "label";

    export interface WindowOptions {
        frame?: boolean;
        showTrafficLights?: boolean;
        transparent?: boolean;
    }

    /**
     * ## Layout system
     * 
     * Yue uses Facebook [Yoga](https://facebook.github.io/yoga/) as layout engine, which provides Flexbox style layout system.
     * 
     * Yue does not support CSS itself, it only uses the concept of Flexbox for layout, and you have to manually set style for each View.
     * 
     * ```js
     * view.setStyle({flexDirection: 'column', flex: 1})
     * ```
     * 
     * It should be noted that not all CSS properties are supported, and there is no plan for support of tables, floats, or similar CSS concepts.
     * 
     * ## View and Container
     * In Yue all widgets are inherited from the virtual class View, which represents a leaf node in the layout system. The Container is a View that can have multiple child Views, in the layout system the child Views of Container are treated as child nodes.
     * 
     * There are Views that can have content view like Group or Scroll, but their content views are treated as root nodes in layout system, instead of being child nodes of their parents.
     * 
     * Following code is an example of list view.
     * 
     * ```js
     * const listView = gui.Scroll.create()
     * const contentView = gui.Container.create()
     * contentView.setStyle({flexDirection: 'column'})
     * for (let i = 0; i < 100; ++i) {
     *   const item = gui.Label.create(String(i))
     *   const g = Math.floor(155 / 100 * i + 100)
     *   item.setBackgroundColor(gui.Color.rgb(100, g, 100))
     *   contentView.addChildView(item)
     * }
     * listView.setContentSize(contentView.getPreferredSize())
     * listView.setContentView(contentView)
     * ```
     * 
     * ## Style properties
     * 
     * For a complete list of supported style properties, it is recommended to read the [documentation of Yoga](https://yogalayout.com/docs).
     * 
     * Yoga style properties mapping in this library are defined in [/nativeui/util/yoga_util.cc](https://github.com/yue/yue/blob/master/nativeui/util/yoga_util.cc).
     */
    export interface StyleProperties {

        heightAuto?: boolean
        heightPercent?: number
        marginAuto?: Edge
        flexWrap?: FlexWrap
        flexDirection?: FlexDirection
        direction?: Direction
        flexBasis?: number
        flexBasisPercent?: number
        alignContent?: Align
        alignItems?: Align
        alignSelf?: Align
        aspectRatio?: number

        border?: number | string
        borderTop?: number | string
        borderRight?: number | string
        borderBottom?: number | string
        borderLeft?: number | string

        display?: Display
        flex?: number
        flexGrow?: number
        flexShrink?: number
        height?: number | string
        justifyContent?: JustifyContent

        margin?: number | string
        marginTop?: number | string
        marginRight?: number | string
        marginBottom?: number | string
        marginLeft?: number | string

        maxHeight?: number | string
        maxHeightPercent?: number
        maxWidth?: number | string
        maxWidthPercent?: number
        minHeight?: number | string
        minHeightPercent?: number
        minWidth?: number | string
        minWidthPercent?: number
        overflow?: Overflow

        padding?: number | string
        // padding?: Partial<ValuedEdges<number>>
        paddingTop?: number | string
        paddingLeft?: number | string
        paddingRight?: number | string
        paddingBottom?: number | string
        position?: PositionType

        width?: number | string
        widthAuto?: boolean
        widthPercent?: number
        bottom?: number | string
        right?: number | string
    }

    type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'

    type Align = 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch'

    type FlexDirection = 'column' | 'column-reverse' | 'count' | 'row' | 'row-reverse'

    type Direction = 'inherit' | 'ltr' | 'rtl'

    type FlexWrap = 'no-wrap' | 'wrap' | 'wrap-reverse'

    type Edge = 'left' | 'top' | 'right' | 'bottom' | 'start' | 'end' | 'horizontal' | 'vertical' | 'all'

    type Display = 'flex' | 'none'

    type Unit = 'auto' | 'percent' | 'point' | 'undefined'

    type Overflow = 'hidden' | 'scroll' | 'visible'

    type PositionType = 'absolute' | 'relative'

}
