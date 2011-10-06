#ifndef CLIPBOARD_WIN
#define CLIPBOARD_WIN

#include <Windows.h>
#include <functional>

namespace clip {
class ClipboardImplW32
{
public:
    typedef function<void ()> slot_t;
    ClipboardImplW32(slot_t slot);
    ~ClipboardImplW32(void);

private:
    HWND handle_;
    slot_t slot_
    static LRESULT CALLBACK MainWndProc(HWND, UINT, WPARAM, LPARAM); 

/* Not to be implemented */
private:
    ClipboardImplW32 (const ClipboardImplW32&);
    ClipboardImplW32& operator= (const ClipboardImplW32&);
};
}

#endif
