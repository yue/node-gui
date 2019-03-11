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
        width: number;
        height: number;
    }

    export interface RectF {
        x: number;
        y: number;
        width: number;
        height: number;
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

    export class TableModel {
        static getRowCount(): number;

        static getValue(column: number, row: number): any;

        static setValue(column: number, row: number, value: any): void;

        static notifyRowInsertion(row: number): void;

        static notifyValueChange(column: number, row: number): void;
    }

    export class View {
        onMouseDown: (self: this, event: MouseEvent) => void;
        onMouseUp: (self: this, event: MouseEvent) => void;
        onMouseMove: (self: this, event: MouseEvent) => void;
        onMouseEnter: (self: this, event: MouseEvent) => void;
        onMouseLeave: (self: this, event: MouseEvent) => void;
        onKeyDown: (self: this, event: KeyEvent) => void;
        onKeyUp: (self: this, event: KeyEvent) => void;
        onDragLeave: (self: this, info: DraggingInfo) => void;
        onSizeChanged: (self: this) => void;
        onCaptureLost: (self: this) => void;
        handleDragEnter: (self: this, info: DraggingInfo, point: PointF) => DragOperation;
        handleDragUpdate: (self: this, info: DraggingInfo, point: PointF) => DragOperation;
        handleDrop: (self: this, info: DraggingInfo, point: PointF) => boolean;

        protected constructor();

        offsetFromView(view: View): Vector2dF;

        offsetFromWindow(): Vector2dF;

        getBounds(): RectF;

        layout(): void;

        schedulePaint(): void;

        schedulePaintRect(rect: RectF): void;

        setVisible(isVisible: boolean): void;

        isVisible(): boolean;

        setEnabled(isEnabled: boolean): void;

        isEnabled(): boolean;

        focus(): void;

        hasFocus(): boolean;

        setFocusable(isFocusable: boolean): void;

        isFocusable(): boolean;

        setCapture(): void;

        releaseCapture(): void;

        hasCapture(): boolean;

        setMouseDownCanMoveWindow(can: boolean): void;

        isMouseDownCanMoveWindow(): boolean;

        doDrag(data: ClipboardData[], operations: DragOperation): number;

        doDragWithOptions(data: ClipboardData[], operations: DragOperation, options: DragOptions): number;

        cancelDrag(): void;

        isDragging(): boolean;

        registerDraggedTypes(types: ClipboardDataType[]): void;

        setCursor(cursor: Cursor): void;

        setFont(font: Font): void;

        setColor(color: ColorArg): void;

        setBackgroundColor(color: ColorArg): void;

        setStyle(styles: any): void;

        getComputedLayout(): string;

        getMinimumSize(): SizeF;

        getParent(): View;

        getWindow(): Window;
    }

    export class Browser extends View {
        onClose: (self: this) => void;
        onUpdateCommand: (self: this) => void;
        onChangeLoading: (self: this) => void;
        onStartNavigation: (self: this, url: string) => void;
        onCommitNavigation: (self: this, url: string) => void;
        onFinishNavigation: (self: this, url: string) => void;
        onFailNavigation: (self: this, url: string, code: number) => void;

        protected constructor();

        static create(options: BrowserOptions): Browser;

        static registerProtocol(scheme: string, handler: (url: string) => void): void;

        static unregisterProtocol(scheme: string): void;

        loadUrl(url: string): void;

        loadHTML(html: string, baseurl: string): void;

        getURL(): string;

        getTitle(): string;

        setUserAgent(userAgent: string): void;

        executeJavaScript(code: string, callback: (success: boolean, result: any) => void): void;

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
    }

    export interface CreateButtonOptions {
        title: string;
        type: ButtonType;
    }

    export class Button extends View {
        onClick: (self: this) => void;

        protected constructor();

        static create(title: string): Button;

        static create(options: CreateButtonOptions): Button;

        setTitle(title: string): void;

        getTitle(): string;

        setChecked(isChecked: boolean): void;

        isChecked(): boolean;

        setImage(image: Image): void;

        getImage(): Image;

        setButtonStyle(style: ButtonStyle): void;

        getButtonStyle(): ButtonStyle;

        setHasBoarder(hasBoarder: boolean): void;

        hasBoarder(): boolean;
    }

    export class Canvas {
        protected constructor();

        static create(size: SizeF, scaleFactor: number): Canvas;

        static createForMainScreen(size: SizeF): Canvas;

        getScaleFactor(): number;

        getPainter(): Painter;

        getSize(): SizeF;
    }

    export class Clipboard {
        protected constructor();

        clear(): void;

        setText(text: string): void;

        getText(): string;

        isDataAvailable(type: ClipboardDataType): boolean;

        getData(type: ClipboardDataType): ClipboardData;

        setData(objects: ClipboardData[]): void;
    }

    export class Color {
        protected constructor();

        static rgb(r: number, g: number, b: number): Color;
        static argb(a: number, r: number, g: number, b: number): Color;
    }

    type ColorArg = Color | string;

    // Actually inherits Picker, but due to typescript limits we can not "inherit" here.
    export class ComboBox extends View {
        onTextChange: (self: this) => void;
        onSelectionChanged: (self: this) => void;

        protected constructor();

        static create(): ComboBox;

        setText(text: string): void;

        getText(): string;

        addItem(title: string): void;

        removeItemAt(index: number): void;

        getItems(): string[];

        selectItemAt(index: number): void;

        getSelectedItem(): string;

        getSelectedItemIndex(): number;
    }

    export class Container extends View {
        onDraw: (self: this, painter: Painter, dirty: RectF) => void;

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
    }

    export class Cursor {
        protected constructor();

        static createWithType(type: CursorType): Cursor;
    }

    export class Entry extends View {
        onTextChange: (self: this) => void;
        onActivate: (self: this) => void;

        protected constructor();

        static create(): Entry;

        static createType(type: EntryType): Entry;

        setText(text: string): void;

        getTtext(): string;
    }

    export class FileDialog {
        static optionPickFolders: number;
        static optionMultiSelect: number;
        static optionShowHidden: number;

        protected constructor();

        getResult(): string;

        run(): boolean;

        runForWindow(window: Window): boolean;

        setTitle(title: string): void;

        setButtonLabel(label: Label): void;

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

        derive(sizeDetla: number, weight: FontWeight, style: FontStyle): Font;

        getName(): string;

        getSize(): number;

        getWeight(): FontWeight;

        getStyle(): FontStyle;
    }

    export class GifPlayer extends View {
        protected constructor();

        static create(): GifPlayer;

        setImage(image: Image): void;

        getImage(): Image;

        setAnimating(isAnimating: boolean): void;

        isAnimating(): boolean;
    }

    export class Group extends View {
        protected constructor();

        static create(title: string): Group;

        setContentView(view: View): void;

        getContentView(): View;

        setTitle(title: string): void;

        getTitle(): string;
    }

    export class Image {
        protected constructor();

        static createEmpty(): Image;

        static createFromPath(path: string): Image;

        // Todo: Fix buffer being any
        static createFromBuffer(buffer: any, scaleFactor: number): Image;

        getSize(): SizeF;

        getScaleFactor(): number;
    }

    export class Label extends View {
        protected constructor();

        static create(text: string): Label;

        setText(text: string): void;

        getText(): string;

        setAlign(align: TextAlign): void;

        setVAlign(align: TextAlign): void;
    }

    // Todo
    export class Lifetime {
    }

    export interface MenuItemOptions {
        type?: MenuItemType;
        role?: MenuItemRole;
        checked?: boolean;
        submenu?: Menu;
        visible?: boolean;
        enabled?: boolean;
        label?: string;
        accelerator?: Accelerator;
        onClick?: (menuItem: MenuItem) => void;
    }

    export class MenuItem {
        onClick: (self: this) => void;

        protected constructor();

        static create(type: MenuItemType): MenuItem;

        static create(options: MenuItemOptions): MenuItem;

        click(): void;

        setLabel(label: string): void;

        getLabel(): string;

        setSubmenu(submenu: Menu): void;

        getSubmenu(): Menu;

        setChecked(isChecked: boolean): void;

        isChecked(): boolean;

        setEnabled(isEnabled: boolean): void;

        isEnabled(): boolean;

        setVisible(isVisible: boolean): void;

        isVisible(): boolean;

        setAccelerator(accelerator: Accelerator): void;
    }

    export class MenuBase {
        append(item: MenuItem): void;

        insert(item: MenuItem, index: number): void;

        remove(item: MenuItem): void;

        itemCount(): number;

        itemAt(index: number): MenuItem;
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
        static run(): void;

        static quit(): void;

        static postTask(task: Function): void;

        static postDelayedTask(ms: number, task: Function): void;
    }

    export class Painter {
        beginPath: void;
        closePath: void;

        save(): void;

        restore(): void;

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

        setColor(color: ColorArg): void;

        setStrokeColor(color: ColorArg): void;

        setLineWidth(width: number): void;

        stroke(): void;

        fill(): void;

        strokeRect(rect: RectF): void;

        fillRect(rect: RectF): void;

        drawImage(image: Image, rect: RectF): void;

        drawImageFromRect(image: Image, src: RectF, dest: RectF): void;

        drawCanvas(canvas: Canvas, rect: RectF): void;

        drawCanvasFromRect(canvas: Canvas, src: RectF, dest: RectF): void;

        measureText(text: string, width: number, attributes: TextAttributes): void;

        drawText(text: string, rect: RectF, attributes: TextAttributes): void;
    }

    export class Picker extends View {
        onSelectionChanged: (self: this) => void;

        protected constructor();

        static create(): Picker;

        addItem(title: string): void;

        removeItemAt(index: number): void;

        getItems(): string[];

        selectItemAt(index: number): void;

        getSelectedItem(): string;

        getSelectedItemIndex(): number;
    }

    export class ProgressBar extends View {
        protected constructor();

        static create(): ProgressBar;

        setValue(percent: number): void;

        getValue(): number;

        setIndeterminate(isIndeterminate: boolean): void;

        isIndeterminate(): boolean;
    }

    export class Scroll extends View {
        protected constructor();

        static create(): Scroll;

        setContentView(view: View): void;

        getContentView(view: View): void;

        setContentSize(size: SizeF): void;

        getContentSize(): SizeF;

        setOverlayScrollbar(overlay: boolean): void;

        isOverlayScrollbar(): boolean;

        setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;

        getScrollbarPolicy(): [ScrollPolicy, ScrollPolicy];
    }

    export class SimpleTableModel extends TableModel {
        protected constructor();

        static create(columns: number): SimpleTableModel;

        addRow(row: any[]): void;

        removeRowAt(index: number): void;
    }

    export class Slider extends View {
        onValueChange: (self: this) => void;
        onSlidingComplete: (self: this) => void;

        protected constructor();

        static create(): Slider;

        setValue(value: number): void;

        getValue(): number;

        setStep(step: number): void;

        setRange(min: number, max: number): void;

        getRange(): [number, number];
    }

    export class Tab extends View {
        onSelectedPageChange: (self: this) => void;

        protected constructor();

        static create(): Tab;

        addPage(title: string, view: View): void;

        removePage(view: View): void;

        pageCount(): number;

        pageAt(index: number): View;

        selectPageAt(index: number): void;

        getSelectedPageIndex(): number;

        getSelectedPage(): View;
    }

    export class Table extends View {
        protected constructor();

        static create(): Table;

        setModel(model: TableModel): void;

        getModel(): TableModel;

        addColumn(title: string): void;

        addColumnWithOptions(title: string, options: TableColumnOptions): void;

        getColumnCount(): number;

        setColumnsVisible(isColumnsVisible: boolean): void

        isColumnsVisible(): void;

        setRowHeight(height: number): void;

        getRowHeight(): number;

        selectRow(row: number): void;

        getSelectedRow(): number;
    }

    export class TextEdit extends View {
        onTextChange: (self: this) => void;
        shouldInsertNewLine: (self: this) => true;

        protected constructor();

        static create(): TextEdit;

        setText(text: string): void;

        getText(): string;

        undo(): void;

        canUndo(): boolean;

        redo(): void;

        canRedo(): boolean;

        cut(): void;

        copy(): void;

        paste(): void;

        selectAll(): void;

        getSelectionRange(): [number, number];

        selectRange(start: number, end: number): void;

        getTextInRange(start: number, end: number): string;

        insertTextAt(text: string, position: number): void;

        delete(): void;

        deleteRange(start: number, end: number): void;

        setOverlayScrollbar(overlay: boolean): void;

        setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;

        getTextBounds(): RectF;
    }

    // Todo - for Mac Only
    export class Toolbar {
    }

    export class Tray {
        onClick: (self: this) => void;

        protected constructor();

        static createWithImage(icon: Image): Tray;

        static createWithTitle(title: string): Tray;

        setTitle(title: string): void;

        setImage(icon: Image): void;

        setMenu(menu: Menu): void;

        getMenu(): Menu;
    }

    // Todo - for Mac Only
    export class Vibrant {
    }

    export class Window {
        onClose: (self: this) => void;
        onFocus: (self: this) => void;
        onBlur: (self: this) => void;
        shouldClose: (self: this) => boolean;

        protected constructor();

        static create(options: WindowOptions): Window;

        close(): void;

        hasFrame(): boolean;

        isTransparent(): boolean;

        setHasShadow(hasShadow: boolean): void;

        hasShadow(): boolean;

        setContentView(view: View): void;

        getContentView(): View;

        center(): void;

        setContentSize(size: SizeF): void;

        getContentSize(): SizeF;

        setBounds(bounds: RectF): void;

        getBounds(): void;

        setSizeConstrains(minsize: SizeF, maxsize: SizeF): void;

        setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void;

        getContentSizeConstraints(): [SizeF, SizeF];

        activate(): void;

        deactivate(): void;

        isActive(): void;

        setVisible(isVisible: boolean): void;

        isVisible(): boolean;

        setAlwaysOnTop(isAlwaysOnTop: boolean): void;

        isAlwaysOnTop(): boolean;

        setFullscreen(isFullscreen: boolean): void;

        isFullscreen(): boolean;

        maximize(): void;

        unmaximize(): void;

        isMaximized(): boolean;

        minimize(): void;

        restore(): void;

        isMinimized(): boolean;

        setResizable(isResizable: boolean): void;

        isResizeable(): boolean;

        setMaximizable(isMaximizable: boolean): void;

        isMaximizable(): boolean;

        setMinimizable(isMinimizable: boolean): void;

        isMinimizable(): boolean;

        setMovable(isMovable: boolean): void;

        isMovable(): boolean;

        setTitle(title: string): void;

        getTitle(): string;

        setBackgroundColor(color: ColorArg): void;

        setToolbar(toolbar: Toolbar): void;

        getToolbar(toolbar: Toolbar): void;

        setTitleVisible(visible: boolean): void;

        isTitleVisible(): boolean;

        setFullSizeContentView(full: boolean): void;

        isFullSizeContentView(): boolean;

        setMenuBar(menubar: MenuBar): void;

        getMenuBar(): MenuBar;

        getParentWindow(): Window;

        addChildWindow(window: Window): void;

        removeChildWindow(window: Window): void;

        getChildWindows(): Window[];
    }

    export type Accelerator = string;
    export type AppThemeColor = "text" | "disabled-text";

    export interface BrowserOptions {
        devtools?: boolean;
        contextMenu?: boolean;
        allowFileAccessFromFiles?: boolean;
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
        static dragOperationNone: number;
        static dragOperationCopy: number;
        static dragOperationMove: number;

        isDataAvailable(type: ClipboardDataType): boolean;

        getData(type: ClipboardDataType): boolean;

        getDragOperations(): number
    }

    export interface DragOptions {
        image: Image;
    }

    export type EntryType = "normal" | "password";

    export class Event {
        static maskShift: number;
        static maskControl: number;
        static maskAlt: number;
        static maskMeta: number;
        type: any; // TODO
        modifiers: number;
        timestamp: number;

        isShiftPressed(): boolean;

        isControlPressed(): boolean;

        isAltPressed(): boolean;

        isMetaPressed(): boolean;
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
        type?: TableColumnType;
        onDraw?: (painter: Painter, rect: RectF, value: any) => void;
        column?: number;
        width?: number;
    }

    export type TableColumnType = "text" | "edit" | "custom";
    export type TextAlign = "start" | "center" | "end";

    export interface TextAttributes {
        font?: Font;
        color?: ColorArg;
        align?: TextAlign;
        valign?: TextAlign;
        wrap?: boolean;
        ellipsis?: boolean;
    }

    export interface TextMetrics {
        size: SizeF;
    }

    export type ToolbarDisplayMode = "default" | "icon-and-label" | "icon" | "label";

    export interface WindowOptions {
        frame?: boolean;
        transparent?: boolean;
        showTrafficLights?: boolean;
    }

}
