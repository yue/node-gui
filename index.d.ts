declare module "gui" {
  export class App {
    protected constructor();
    setApplicationMenu(menu: MenuBar): void;
    getApplicationMenu(): MenuBar;
    setDockBadgeLabel(label: string): void;
    getDockBadgeLabel(): string;
    getColor(name: AppThemeColor): number;
    getDefaultFont(): Font;
    getClipboard(type: ClipboardType): Clipboard;
  }

  export class Canvas {
    protected constructor();
    static create(size: SizeF, scaleFactor: number): Canvas;
    static createForMainScreen(size: SizeF): Canvas;
    getScaleFactor(): number;
    getPainter(): Painter;
    getSize(): SizeF;
  }

  export class Cursor {
    protected constructor();
    static createWithType(type: CursorType): Font;
  }

  export class FileDialog {
    protected constructor();
    static optionPickFolders: number;
    static optionMultiSelect: number;
    static optionShowHidden: number;
    getResult(): string;
    run(): boolean;
    runForWindow(window: Window): boolean;
    setTitle(title: string): void;
    setButtonLabel(label: string): void;
    setFilename(filename: string): void;
    setFolder(folder: string): void;
    setOptions(options: number): void;
    setFilters(filters: FileDialogFilter[]): void;
  }

  export class FileOpenDialog extends FileDialog {
    protected constructor();
    static create(): FileOpenDialog;
    getResults(): string[];
  }

  export class FileSaveDialog extends FileDialog {
    protected constructor();
    static create(): FileSaveDialog;
  }

  export class Font {
    protected constructor();
    static default(): Font;
    static create(name: string, size: number, weight: FontWeight, style: FontStyle): Font;
    derive(sizeDelta: number, weight: FontWeight, style: FontStyle): Font;
    getName(): string;
    getSize(): number;
    getWeight(): FontWeight;
    getStyle(): FontStyle;
  }

  export class Image {
    protected constructor();
    static createEmpty(): Image;
    static createFromPath(path: string): Image;
    static createFromBuffer(buffer: any, scaleFactor: number): Image;
    getSize(): SizeF;
    getScaleFactor(): number;
  }

  export class Lifetime {
    protected constructor();
    onReady: any;
    onActivate: any;
  }

  export class MenuBase {
    protected constructor();
    append(item: MenuItem): void;
    insert(item: MenuItem, index: number): void;
    remove(item: MenuItem): void;
    itemCount(): number;
    itemAt(index: number): MenuItem;
  }

  export class Menu extends MenuBase {
    protected constructor();
    static create(items: any[]): Menu;
    popup(): void;
  }

  export class MenuBar extends MenuBase {
    protected constructor();
    static create(items: any[]): MenuBar;
  }

  export class MenuItem {
    protected constructor();
    static create(type: MenuItemType): MenuItem;
    static create(options: object): MenuItem;
    click(): void;
    setLabel(label: string): void;
    getLabel(): string;
    setSubmenu(submenu: Menu): void;
    getSubmenu(): Menu;
    setChecked(checked: boolean): void;
    isChecked(): boolean;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    setVisible(visible: boolean): void;
    isVisible(): boolean;
    setAccelerator(accelerator: string): void;
    onClick: any;
  }

  export class Painter {
    protected constructor();
    save(): void;
    restore(): void;
    beginPath(): void;
    closePath(): void;
    moveTo(point: PointF): void;
    lineTo(point: PointF): void;
    bezierCurveTo(cp1: PointF, cp2: PointF, ep: PointF): void;
    arc(point: PointF, radius: number, sa: number, ea: number): void;
    rect(rect: RectF): void;
    clip(): void;
    clipRect(rect: RectF): void;
    translate(offset: Vector2dF): void;
    rotate(angle: number): void;
    scale(scale: Vector2dF): void;
    setColor(color: string | number): void;
    setStrokeColor(color: string | number): void;
    setFillColor(color: string | number): void;
    setLineWidth(width: number): void;
    stroke(): void;
    fill(): void;
    strokeRect(rect: RectF): void;
    fillRect(rect: RectF): void;
    drawImage(image: Image, rect: RectF): void;
    drawImageFromRect(image: Image, src: RectF, dest: RectF): void;
    drawCanvas(canvas: Canvas, rect: RectF): void;
    drawCanvasFromRect(canvas: Canvas, src: RectF, dest: RectF): void;
    measureText(text: string, width: number, attributes: TextAttributes): TextMetrics;
    drawText(text: string, rect: RectF, attributes: TextAttributes): void;
  }

  export class ProtocolJob {
    protected constructor();
  }

  export class ProtocolAsarJob extends ProtocolJob {
    protected constructor();
    static create(asar: string, path: string): ProtocolAsarJob;
    setDecipher(key: string, iv: string): boolean;
  }

  export class ProtocolFileJob extends ProtocolJob {
    protected constructor();
    static create(path: string): ProtocolFileJob;
  }

  export class ProtocolStringJob extends ProtocolJob {
    protected constructor();
    static create(mimetype: string, content: string): ProtocolStringJob;
  }

  export class TableModel {
    protected constructor();
    notifyRowInsertion(row: number): void;
    notifyRowDeletion(row: number): void;
    notifyValueChange(column: number, row: number): void;
  }

  export class AbstractTableModel extends TableModel {
    protected constructor();
    getRowCount: (self: AbstractTableModel) => number;
    getValue: (self: AbstractTableModel, column: number, row: number) => any;
    setValue: (self: AbstractTableModel, column: number, row: number, value: any) => void;
  }

  export class SimpleTableModel extends TableModel {
    protected constructor();
    static create(columns: number): SimpleTableModel;
    addRow(row: any[]): void;
    removeRowAt(index: number): void;
  }

  export class Toolbar {
    protected constructor();
    static create(identifier: string): Toolbar;
    setDefaultItemIdentifiers(identifiers: string[]): void;
    setAllowedItemIdentifiers(identifiers: string[]): void;
    setAllowCustomization(allow: boolean): void;
    setDisplayMode(mode: ToolbarDisplayMode): void;
    setVisible(visible: boolean): void;
    isVisible(): boolean;
    getIdentifier(): string;
    getItem: (toolbar: Toolbar, identifier: string) => ToolbarItem;
  }

  export class Tray {
    protected constructor();
    static createWithImage(icon: Image): Tray;
    static createWithTitle(title: string): Tray;
    setTitle(title: string): void;
    setImage(icon: Image): void;
    setMenu(menu: Menu): void;
    getMenu(): Menu;
    onClick: any;
  }

  export class View {
    protected constructor();
    offsetFromView(view: View): Vector2dF;
    offsetFromWindow(): Vector2dF;
    getBounds(): RectF;
    layout(): void;
    schedulePaint(): void;
    schedulePaintRect(rect: RectF): void;
    setVisible(visible: boolean): void;
    isVisible(): boolean;
    setEnabled(enable: boolean): void;
    isEnabled(): boolean;
    focus(): void;
    hasFocus(): boolean;
    setFocusable(focusable: boolean): void;
    isFocusable(): boolean;
    setCapture(): void;
    releaseCapture(): void;
    hasCapture(): boolean;
    setMouseDownCanMoveWindow(can: boolean): void;
    isMouseDownCanMoveWindow(): boolean;
    doDrag(data: ClipboardData[], operations: number): number;
    doDragWithOptions(data: ClipboardData[], operations: number, options: DragOptions): number;
    cancelDrag(): void;
    isDragging(): boolean;
    registerDraggedTypes(types: ClipboardDataType[]): void;
    setCursor(cursor: Cursor): void;
    setFont(font: Font): void;
    setColor(color: string | number): void;
    setBackgroundColor(color: string | number): void;
    setStyle(styles: object): void;
    getComputedLayout(): string;
    getMinimumSize(): SizeF;
    getParent(): View;
    getWindow(): Window;
    handleDragEnter: (self: View, info: DraggingInfo, point: PointF) => number;
    handleDragUpdate: (self: View, info: DraggingInfo, point: PointF) => number;
    handleDrop: (self: View, info: DraggingInfo, point: PointF) => boolean;
    onMouseDown: any;
    onMouseUp: any;
    onMouseMove: any;
    onMouseEnter: any;
    onMouseLeave: any;
    onKeyDown: any;
    onKeyUp: any;
    onDragLeave: any;
    onSizeChanged: any;
    onCaptureLost: any;
  }

  export class Browser extends View {
    protected constructor();
    static create(options: BrowserOptions): Browser;
    static registerProtocol(scheme: string, handler: Function): boolean;
    static unregisterProtocol(scheme: string): void;
    loadURL(url: string): void;
    loadHTML(html: string, baseurl: string): void;
    getURL(): string;
    getTitle(): string;
    setUserAgent(userAgent: string): void;
    executeJavaScript(code: string, callback: Function): void;
    goBack(): void;
    canGoBack(): boolean;
    goForward(): void;
    canGoForward(): boolean;
    reload(): void;
    stop(): void;
    isLoading(): boolean;
    setBindingName(name: string): void;
    addBinding(name: string, func: Function): void;
    addRawBinding(name: string, func: Function): void;
    removeBinding(name: string): void;
    onClose: any;
    onUpdateCommand: any;
    onChangeLoading: any;
    onUpdateTitle: any;
    onStartNavigation: any;
    onCommitNavigation: any;
    onFinishNavigation: any;
    onFailNavigation: any;
  }

  export class Button extends View {
    protected constructor();
    static create(title: string): Button;
    static create(options: object): Button;
    setTitle(title: string): void;
    getTitle(): string;
    setChecked(checked: boolean): void;
    isChecked(): boolean;
    setImage(image: Image): void;
    getImage(): Image;
    setButtonStyle(style: ButtonStyle): void;
    setHasBorder(yes: boolean): void;
    hasBorder(): boolean;
    onClick: any;
  }

  export class Container extends View {
    protected constructor();
    static create(): Container;
    getPreferredSize(): SizeF;
    getPreferredHeightForWidth(width: number): number;
    getPreferredWidthForHeight(height: number): number;
    addChildView(view: View): void;
    addChildViewAt(view: View, index: number): void;
    removeChildView(view: View): void;
    childCount(): number;
    childAt(index: number): View;
    onDraw: any;
  }

  export class Vibrant extends Container {
    protected constructor();
    static create(): Vibrant;
    setMaterial(material: VibrantMaterial): void;
    getMaterial(): VibrantMaterial;
    setBlendingMode(mode: VibrantBlendingMode): void;
    getBlendingMode(): VibrantBlendingMode;
  }

  export class Entry extends View {
    protected constructor();
    static create(): Entry;
    static createType(type: EntryType): Entry;
    setText(text: string): void;
    getText(): string;
    onTextChange: any;
    onActivate: any;
  }

  export class GifPlayer extends View {
    protected constructor();
    static create(): GifPlayer;
    setImage(image: Image): void;
    getImage(): Image;
    setAnimating(animating: boolean): void;
    isAnimating(): boolean;
  }

  export class Group extends View {
    protected constructor();
    static create(title: string): Group;
    setContentView(view: Container): void;
    getContentView(): Container;
    setTitle(title: string): void;
    getTitle(): string;
  }

  export class Label extends View {
    protected constructor();
    static create(text: string): Label;
    setText(text: string): void;
    getText(): string;
    setAlign(align: TextAlign): void;
    setVAlign(align: TextAlign): void;
  }

  export class Picker extends View {
    protected constructor();
    static create(): Picker;
    addItem(title: string): void;
    removeItemAt(index: number): void;
    getItems(): string[];
    selectItemAt(index: number): void;
    getSelectedItem(): string;
    getSelectedItemIndex(): number;
    onSelectionChange: any;
  }

  export class ComboBox extends Picker {
    protected constructor();
    static create(): ComboBox;
    setText(text: string): void;
    getText(): string;
    onTextChange: any;
  }

  export class ProgressBar extends View {
    protected constructor();
    static create(): ProgressBar;
    setValue(percent: number): void;
    getValue(): number;
    setIndeterminate(indeterminate: boolean): void;
    isIndeterminate(): boolean;
  }

  export class Scroll extends View {
    protected constructor();
    static create(): Scroll;
    setContentView(view: View): void;
    getContentView(): View;
    setContentSize(size: SizeF): void;
    getContentSize(): SizeF;
    setOverlayScrollbar(overlay: boolean): void;
    isOverlayScrollbar(): boolean;
    setScrollbarPolicy(hpolicy: ScrollPolicy, vpolicy: ScrollPolicy): void;
    getScrollbarPolicy(): [ScrollPolicy, ScrollPolicy];
  }

  export class Slider extends View {
    protected constructor();
    static create(): Slider;
    setValue(value: number): void;
    getValue(): number;
    setStep(step: number): void;
    getStep(): number;
    setRange(min: number, max: number): void;
    getRange(): [number, number];
    onValueChange: any;
    onSlidingComplete: any;
  }

  export class Tab extends View {
    protected constructor();
    static create(): Tab;
    addPage(title: string, view: View): void;
    removePage(view: View): void;
    pageCount(): number;
    pageAt(index: number): View;
    selectPageAt(index: number): void;
    getSelectedPageIndex(): number;
    getSelectedPage(): View;
    onSelectedPageChange: any;
  }

  export class Table extends View {
    protected constructor();
    static create(): Table;
    setModel(model: TableModel): void;
    getModel(): TableModel;
    addColumn(title: string): void;
    addColumnWithOptions(title: string, options: TableColumnOptions): void;
    getColumnCount(): number;
    setColumnsVisible(visible: boolean): void;
    isColumnsVisible(): boolean;
    setRowHeight(height: number): void;
    getRowHeight(): number;
    selectRow(row: number): void;
    getSelectedRow(): number;
  }

  export class TextEdit extends View {
    protected constructor();
    static create(): TextEdit;
    setText(text: string): void;
    getText(): string;
    undo(): void;
    canUndo(): void;
    redo(): void;
    canRedo(): void;
    cut(): void;
    copy(): void;
    paste(): void;
    selectAll(): void;
    getSelectionRange(): [number, number];
    selectRange(start: number, end: number): void;
    getTextInRange(start: number, end: number): string;
    insertText(text: string): void;
    insertTextAt(text: string, position: number): void;
    delete(): void;
    deleteRange(start: number, end: number): void;
    setOverlayScrollbar(overlay: boolean): void;
    setScrollbarPolicy(hpolicy: ScrollPolicy, vpolicy: ScrollPolicy): void;
    getTextBounds(): RectF;
    shouldInsertNewLine: (self: TextEdit) => boolean;
    onTextChange: any;
  }

  export class Window {
    protected constructor();
    static create(options: WindowOptions): Window;
    close(): void;
    hasFrame(): boolean;
    isTransparent(): boolean;
    setHasShadow(has: boolean): void;
    hasShadow(): boolean;
    setContentView(view: View): void;
    getContentView(): View;
    center(): void;
    setContentSize(size: SizeF): void;
    getContentSize(): SizeF;
    setBounds(bounds: RectF): void;
    getBounds(): RectF;
    setSizeConstraints(minsize: SizeF, maxsize: SizeF): void;
    getSizeConstraints(): [SizeF, SizeF];
    setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void;
    getContentSizeConstraints(): [SizeF, SizeF];
    activate(): void;
    deactivate(): void;
    isActive(): boolean;
    setVisible(visible: boolean): void;
    isVisible(): boolean;
    setAlwaysOnTop(top: boolean): void;
    isAlwaysOnTop(): boolean;
    setFullscreen(fullscreen: boolean): void;
    isFullscreen(): boolean;
    maximize(): void;
    unmaximize(): void;
    isMaximized(): boolean;
    minimize(): void;
    restore(): void;
    isMinimized(): boolean;
    setResizable(resizable: boolean): void;
    isResizable(): boolean;
    setMaximizable(maximizable: boolean): void;
    isMaximizable(): boolean;
    setMinimizable(minimizable: boolean): void;
    isMinimizable(): boolean;
    setMovable(movable: boolean): void;
    isMovable(): boolean;
    setTitle(title: string): void;
    getTitle(): string;
    setBackgroundColor(color: string | number): void;
    setToolbar(toolbar: Toolbar): void;
    getToolbar(): Toolbar;
    setTitleVisible(visible: boolean): void;
    isTitleVisible(): boolean;
    setFullSizeContentView(full: boolean): void;
    isFullSizeContentView(): boolean;
    setMenuBar(menubar: MenuBar): void;
    getMenuBar(): MenuBar;
    getParentWindow(): Window;
    addChildWindow(child: Window): void;
    removeChildWindow(child: Window): void;
    getChildWindows(): Window[];
    shouldClose: (self: Window) => boolean;
    onClose: any;
    onFocus: any;
    onBlur: any;
  }

  export interface Clipboard {
    clear(): void;
    setText(text: string): void;
    getText(): string;
    isDataAvailable(type: ClipboardDataType): boolean;
    getData(type: ClipboardDataType): ClipboardData;
    setData(objects: ClipboardData[]): void;
  }

  export class Color {
    protected constructor();
    static rgb(r: number, g: number, b: number): number;
    static argb(a: number, r: number, g: number, b: number): number;
  }

  export class MessageLoop {
    protected constructor();
    static run(): void;
    static quit(): void;
    static postTask(task: Function): void;
    static postDelayedTask(ms: number, task: Function): void;
  }

  export interface BrowserOptions {
    devtools?: boolean;
    contextMenu?: boolean;
    allowFileAccessFromFiles?: boolean;
    hardwareAcceleration?: boolean;
  }

  export interface ClipboardData {
    type: ClipboardDataType;
    value: any;
  }

  export class DraggingInfo {
    protected constructor();
    static dragOperationNone: number;
    static dragOperationCopy: number;
    static dragOperationMove: number;
    isDataAvailable(type: ClipboardDataType): boolean;
    getData(type: ClipboardDataType): ClipboardData;
    getDragOperations(): number;
  }

  export interface DragOptions {
    image: Image;
  }

  export class Event {
    protected constructor();
    static maskShift: number;
    static maskContrl: number;
    static maskAlt: number;
    static maskMeta: number;
    static isShiftPressed(): boolean;
    static isControlPressed(): boolean;
    static isAltPressed(): boolean;
    static isMetaPressed(): boolean;
    type: EventType;
    modifiers: number;
    timestamp: number;
  }

  export interface FileDialogFilter {
    description: string;
    extensions: string[];
  }

  export interface KeyEvent extends Event {
    key: string;
  }

  export interface MouseEvent extends Event {
    button: number;
    positionInView: PointF;
    positionInWindow: PointF;
  }

  export interface PointF {
    x: number;
    y: number;
  }

  export interface RectF {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface SizeF {
    width: number;
    height: number;
  }

  export interface TableColumnOptions {
    type?: TableColumnType;
    onDraw?: Function;
    column?: number;
    width?: number;
  }

  export interface TextAttributes {
    font?: Font;
    color?: string | number;
    align?: TextAlign;
    valign?: TextAlign;
    wrap?: boolean;
    ellipsis?: boolean;
  }

  export interface TextMetrics {
    size: SizeF;
  }

  export interface ToolbarItem {
    label?: string;
    minSize?: SizeF;
    maxSize?: SizeF;
    image?: Image;
    view?: View;
    onClick?: Function;
  }

  export interface Vector2dF {
    x: number;
    y: number;
  }

  export interface WindowOptions {
    frame?: boolean;
    transparent?: boolean;
    showTrafficLights?: boolean;
  }

  export type AppThemeColor = "text" | "disabled-text";

  export type ButtonStyle = "rounded" | "regular-square" | "thick-square" | "thicker-square" | "disclosure" | "shadowless-square" | "circular" | "textured-square" | "help-button" | "small-square" | "textured-rounded" | "round-rect" | "recessed" | "rounded-disclosure" | "inline";

  export type ButtonType = "normal" | "checkbox" | "radio";

  export type ClipboardDataType = "text" | "html" | "image" | "file-paths" | "none";

  export type ClipboardType = "copy-paste" | "drag" | "find" | "font" | "selection";

  export type CursorType = "default" | "hand" | "crosshair" | "progress" | "text" | "not-allowed" | "help" | "move" | "resize-ew" | "resize-ns" | "resize-nesw" | "resize-nwse";

  export type EntryType = "normal" | "password";

  export type EventType = "unknown" | "mouse-down" | "mouse-up" | "mouse-move" | "mouse-enter" | "mouse-leave" | "key-down" | "key-up";

  export type FontStyle = "normal" | "italic";

  export type FontWeight = "thin" | "extra-light" | "light" | "normal" | "medium" | "semi-bold" | "bold" | "extra-bold" | "black";

  export type MenuItemRole = "copy" | "cut" | "paste" | "select-all" | "undo" | "redo" | "about" | "hide" | "hide-others" | "unhide" | "help" | "window" | "services";

  export type MenuItemType = "label" | "checkbox" | "radio" | "separator" | "submenu";

  export type ScrollPolicy = "always" | "never" | "automatic";

  export type TableColumnType = "text" | "edit" | "custom";

  export type TextAlign = "start" | "center" | "end";

  export type ToolbarDisplayMode = "default" | "icon-and-label" | "icon" | "label";

  export type VibrantBlendingMode = "behind-window" | "within-window";

  export type VibrantMaterial = "appearance-based" | "light" | "dark" | "titlebar";

  export interface Signal<T> {
    connect(handler: T): number;
    disconnect(id: number): void;
    disconnectAll(): void;
  }
}
