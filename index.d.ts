// Definitions by Kevin Gravier <kevin@mrkmg.com>

declare module "gui" {
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
    static getApplicationMenu(): MenuBar;
    static getClipboardType(): ClipboardDataType;
    static getColor(name: AppThemeColor): Color;
    static getDefaultFont(): Font;
    static getDockBadgeLabel(): string;
    static setApplicationMenu(menu: MenuBar): void;
    static setDockBadgeLabel(label: string): void;
  }

  export class TableModel {
    static getRowCount(): number;
    static getValue(column: number, row: number): any;
    static notifyRowInsertion(row: number): void;
    static notifyValueChange(column: number, row: number): void;
    static setValue(column: number, row: number, value: any): void;
  }

  export class View {
    protected constructor();
    cancelDrag(): void;
    doDrag(data: ClipboardData[], operations: DragOperation): number;
    doDragWithOptions(data: ClipboardData[], operations: DragOperation, options: DragOptions): number;
    focus(): void;
    getBounds(): RectF;
    getComputedLayout(): string;
    getMinimumSize(): SizeF;
    getParent(): View;
    getWindow(): Window;
    handleDragEnter(self: this, info: DraggingInfo, point: PointF): DragOperation;
    handleDragUpdate(self: this, info: DraggingInfo, point: PointF): DragOperation;
    handleDrop(self: this, info: DraggingInfo, point: PointF): boolean;
    hasCapture(): boolean;
    hasFocus(): boolean;
    isDragging(): boolean;
    isEnabled(): boolean;
    isFocusable(): boolean;
    isMouseDownCanMoveWindow(): boolean;
    isVisible(): boolean;
    layout(): void;
    offsetFromView(view: View): Vector2dF;
    offsetFromWindow(): Vector2dF;
    onCaptureLost(self: this): void;
    onDragLeave(self: this, info: DraggingInfo): void;
    onKeyDown(self: this, event: KeyEvent): void;
    onKeyUp(self: this, event: KeyEvent): void;
    onMouseDown(self: this, event: MouseEvent): void;
    onMouseEnter(self: this, event: MouseEvent): void;
    onMouseLeave(self: this, event: MouseEvent): void;
    onMouseMove(self: this, event: MouseEvent): void;
    onMouseUp(self: this, event: MouseEvent): void;
    onSizeChanged(self: this): void;
    registerDraggedTypes(types: ClipboardDataType[]): void;
    releaseCapture(): void;
    schedulePaint(): void;
    schedulePaintRect(rect: RectF): void;
    setBackgroundColor(color: ColorArg): void;
    setCapture(): void;
    setColor(color: ColorArg): void;
    setCursor(cursor: Cursor): void;
    setEnabled(isEnabled: boolean): void;
    setFocusable(isFocusable: boolean): void;
    setFont(font: Font): void;
    setMouseDownCanMoveWindow(can: boolean): void;
    setStyle(styles: any): void;
    setVisible(isVisible: boolean): void;
  }

  export class Browser extends View {
    protected constructor();
    static create(options: BrowserOptions): Browser;
    static registerProtocol(scheme: string, handler: (url: string) => void): void;
    static unregisterProtocol(scheme: string): void;
    addBinding(name: string, func: Function): void;
    addRawBinding(name: string, func: Function): void;
    canGoBack(): boolean;
    canGoForward(): boolean;
    executeJavaScript(code: string, callback: (success: boolean, result: any) => void): void;
    getTitle(): string;
    getURL(): string;
    goBack(): void;
    goForward(): void;
    isLoading(): boolean;
    loadHTML(html: string, baseurl: string): void;
    loadUrl(url: string): void;
    onChangeLoading(self: this): void;
    onClose(self: this): void;
    onCommitNavigation(self: this, url: string): void;
    onFailNavigation(self: this, url: string, code: number): void;
    onFinishNavigation(self: this, url: string): void;
    onStartNavigation(self: this, url: string): void;
    onUpdateCommand(self: this): void;
    reload(): void;
    removeBinding(name: string): void;
    setBindingName(name: string): void;
    setUserAgent(userAgent: string): void;
    stop(): void;
  }

  export interface CreateButtonOptions {
    title: string;
    type: ButtonType;
  }

  export class Button extends View {
    protected constructor();
    static create(title: string): Button;
    static create(options: CreateButtonOptions): Button;
    getButtonStyle(): ButtonStyle;
    getImage(): Image;
    getTitle(): string;
    hasBoarder(): boolean;
    isChecked(): boolean;
    onClick(self: this): void;
    setButtonStyle(style: ButtonStyle): void;
    setChecked(isChecked: boolean): void;
    setHasBoarder(hasBoarder: boolean): void;
    setImage(image: Image): void;
    setTitle(title: string): void;
  }

  export class Canvas {
    protected constructor();
    static create(size: SizeF, scaleFactor: number): Canvas;
    static createForMainScreen(size: SizeF): Canvas;
    getPainter(): Painter;
    getScaleFactor(): number;
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
    static argb(a: number, r: number, g: number, b: number): Color;
    static rgb(r: number, g: number, b: number): Color;
  }

  type ColorArg = Color | string;

  export class ComboBox extends Picker {
    protected constructor();
    static create(): ComboBox;
    getText(): string;
    onTextChange(self: this): void;
    setText(text: string): void;
  }

  export class Container extends View {
    protected constructor();
    static create(): Container;
    addChildView(view: View): void;
    addChildViewAt(view: View, index: number): void;
    childAt(index: number): View;
    childCount(): number;
    getPreferredHeightForWidth(width: number): number;
    getPreferredSize(): SizeF;
    getPreferredWidthForHeight(height: number): number;
    onDraw(self: this, painter: Painter, dirty: RectF): void;
    removeChildView(view: View): void;
  }

  export class Cursor {
    protected constructor();
    static createWithType(type: CursorType): Cursor;
  }

  export class Entry extends View {
    protected constructor();
    static create(): Entry;
    static createType(type: EntryType): Entry;
    getText(): string;
    onActivate(self: this): void;
    onTextChange(self: this): void;
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
    static create(name: string, size: number, weight: FontWeight, style: FontStyle): Font;
    static default(): Font;
    derive(sizeDetla: number, weight: FontWeight, style: FontStyle): Font;
    getName(): string;
    getSize(): number;
    getStyle(): FontStyle;
    getWeight(): FontWeight;
  }

  export class GifPlayer extends View {
    protected constructor();
    static create(): GifPlayer;
    getImage(): Image;
    isAnimating(): boolean;
    setAnimating(isAnimating: boolean): void;
    setImage(image: Image): void;
  }

  export class Group extends View {
    protected constructor();
    static create(title: string): Group;
    getContentView(): View;
    getTitle(): string;
    setContentView(view: View): void;
    setTitle(title: string): void;
  }

  export class Image {
    protected constructor();
    static createEmpty(): Image;
    // TODO: Fix buffer being any.
    static createFromBuffer(buffer: any, scaleFactor: number): Image;
    static createFromPath(path: string): Image;
    getScaleFactor(): number;
    getSize(): SizeF;
  }

  export class Label extends View {
    protected constructor();
    static create(text: string): Label;
    getText(): string;
    setAlign(align: TextAlign): void;
    setText(text: string): void;
    setVAlign(align: TextAlign): void;
  }

  export class Lifetime {
    onActivate(): void;
    onReady(): void;
  }

  export interface MenuItemOptions {
    accelerator?: Accelerator;
    checked?: boolean;
    enabled?: boolean;
    label?: string;
    onClick?: (menuItem: MenuItem) => void;
    role?: MenuItemRole;
    submenu?: Menu;
    type?: MenuItemType;
    visible?: boolean;
  }

  export class MenuItem {
    protected constructor();
    static create(type: MenuItemType): MenuItem;
    static create(options: MenuItemOptions): MenuItem;
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
    static create(items: MenuItem[]): Menu;
    popup(): void;
  }

  export class MenuBar extends MenuBase {
    protected constructor();
    static create(items: MenuItem[]): MenuBar;
  }

  export class MessageLoop {
    static postDelayedTask(ms: number, task: Function): void;
    static postTask(task: Function): void;
    static quit(): void;
    static run(): void;
  }

  export class Painter {
    arc(point: PointF, radius: number, sa: number, ea: number): void;
    beginPath(): void;
    bezierCurveTo(cp1: PointF, cp2: PointF, ep: PointF): void;
    clip(): void;
    clipRect(rect: RectF): void;
    closePath(): void;
    drawCanvas(canvas: Canvas, rect: RectF): void;
    drawCanvasFromRect(canvas: Canvas, src: RectF, dest: RectF): void;
    drawImage(image: Image, rect: RectF): void;
    drawImageFromRect(image: Image, src: RectF, dest: RectF): void;
    drawText(text: string, rect: RectF, attributes: TextAttributes): void;
    fill(): void;
    fillRect(rect: RectF): void;
    lineTo(point: PointF): void;
    measureText(text: string, width: number, attributes: TextAttributes): TextMetrics;
    moveTo(point: PointF): void;
    rect(rect: RectF): void;
    restore(): void;
    rotate(angle: number): void;
    save(): void;
    scale(scale: Vector2dF): void;
    setColor(color: ColorArg): void;
    setLineWidth(width: number): void;
    setStrokeColor(color: ColorArg): void;
    stroke(): void;
    strokeRect(rect: RectF): void;
    translate(offset: Vector2dF): void;
  }

  export class Picker extends View {
    protected constructor();
    static create(): Picker;
    addItem(title: string): void;
    getItems(): string[];
    getSelectedItem(): string;
    getSelectedItemIndex(): number;
    onSelectionChanged(self: this): void;
    removeItemAt(index: number): void;
    selectItemAt(index: number): void;
  }

  export class ProgressBar extends View {
    protected constructor();
    static create(): ProgressBar;
    getValue(): number;
    isIndeterminate(): boolean;
    setIndeterminate(isIndeterminate: boolean): void;
    setValue(percent: number): void;
  }

  export class Scroll extends View {
    protected constructor();
    static create(): Scroll;
    getContentSize(): SizeF;
    getContentView(view: View): void;
    getScrollbarPolicy(): [ScrollPolicy, ScrollPolicy];
    isOverlayScrollbar(): boolean;
    setContentSize(size: SizeF): void;
    setContentView(view: View): void;
    setOverlayScrollbar(overlay: boolean): void;
    setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;
  }

  export class SimpleTableModel extends TableModel {
    protected constructor();
    static create(columns: number): SimpleTableModel;
    addRow(row: any[]): void;
    removeRowAt(index: number): void;
  }

  export class Slider extends View {
    protected constructor();
    static create(): Slider;
    getRange(): [number, number];
    getValue(): number;
    onSlidingComplete(self: this): void;
    onValueChange(self: this): void;
    setRange(min: number, max: number): void;
    setStep(step: number): void;
    setValue(value: number): void;
  }

  export class Tab extends View {
    protected constructor();
    static create(): Tab;
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
    protected constructor();
    static create(): Table;
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
    protected constructor();
    static create(): TextEdit;
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
    protected constructor();
    static create(identifier: string): Toolbar;
    getIdentifier(): string;
    getItem(toolbar, identifier): ToolbarItem;
    isVisible(): boolean;
    setAllowCustomization(allow: boolean): void;
    setAllowedItemIdentifiers(identifiers: string[]): void;
    setDefaultItemIdentifiers(identifiers: string[]): void;
    setDisplayMode(mode: ToolbarDisplayMode): void;
    setVisible(visible: boolean): void;
  }

  export class Tray {
    protected constructor();
    static createWithImage(icon: Image): Tray;
    static createWithTitle(title: string): Tray;
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
    protected constructor();
    static create(): Vibrant;
    getBlendingMode(): VibrantBlendingMode;
    getMaterial(): VibrantMaterial;
    setBlendingMode(mode: VibrantBlendingMode): void;
    setMaterial(material: VibrantMaterial): void;
  }

  export class Window {
    protected constructor();
    static create(options: WindowOptions): Window;
    activate(): void;
    addChildWindow(window: Window): void;
    center(): void;
    close(): void;
    deactivate(): void;
    getBounds(): void;
    getChildWindows(): Window[];
    getContentSize(): SizeF;
    getContentSizeConstraints(): [SizeF, SizeF];
    getContentView(): View;
    getMenuBar(): MenuBar;
    getParentWindow(): Window;
    getTitle(): string;
    getToolbar(toolbar: Toolbar): void;
    hasFrame(): boolean;
    hasShadow(): boolean;
    isActive(): void;
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
    isTransparent(): boolean;
    isVisible(): boolean;
    maximize(): void;
    minimize(): void;
    onBlur(self: this): void;
    onClose(self: this): void;
    onFocus(self: this): void;
    removeChildWindow(window: Window): void;
    restore(): void;
    setAlwaysOnTop(isAlwaysOnTop: boolean): void;
    setBackgroundColor(color: ColorArg): void;
    setBounds(bounds: RectF): void;
    setContentSize(size: SizeF): void;
    setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void;
    setContentView(view: View): void;
    setFullscreen(isFullscreen: boolean): void;
    setFullSizeContentView(full: boolean): void;
    setHasShadow(hasShadow: boolean): void;
    setMaximizable(isMaximizable: boolean): void;
    setMenuBar(menubar: MenuBar): void;
    setMinimizable(isMinimizable: boolean): void;
    setMovable(isMovable: boolean): void;
    setResizable(isResizable: boolean): void;
    setSizeConstrains(minsize: SizeF, maxsize: SizeF): void;
    setTitle(title: string): void;
    setTitleVisible(visible: boolean): void;
    setToolbar(toolbar: Toolbar): void;
    setVisible(isVisible: boolean): void;
    shouldClose(self: this): boolean;
    unmaximize(): void;
  }

  export type Accelerator = string;
  export type AppThemeColor = "text" | "disabled-text";

  export interface BrowserOptions {
    allowFileAccessFromFiles?: boolean;
    contextMenu?: boolean;
    devtools?: boolean;
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

  export class Event {
    static maskAlt: number;
    static maskControl: number;
    static maskMeta: number;
    static maskShift: number;
    modifiers: number;
    timestamp: number;
    type: any; // TODO - docs 404 error
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

  export interface TextAttributes {
    align?: TextAlign;
    color?: ColorArg;
    ellipsis?: boolean;
    font?: Font;
    valign?: TextAlign;
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
}
