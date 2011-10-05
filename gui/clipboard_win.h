#ifndef CLIPBOARD_WIN
#define CLIPBOARD_WIN

#include <Windows.h>
#include <sigc++\sigc++.h>

namespace clip {
class WinClipboardMonitor
{
public:
    WinClipboardMonitor(sigc::slot<void> slot);
    ~WinClipboardMonitor(void);

private:
    HWND handle_;
    sigc::slot<void> slot_;
    static LRESULT CALLBACK MainWndProc(HWND, UINT, WPARAM, LPARAM); 

/* Not to be implemented */
private:
    WinClipboardMonitor (const WinClipboardMonitor&);
    WinClipboardMonitor& operator= (const WinClipboardMonitor&);
};
}

#endif