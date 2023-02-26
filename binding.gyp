{
  'includes': [
    'filenames_libyue.gypi',
    'filenames_src.gypi',
  ],
  'targets': [
    {
      'target_name': 'gui',
      'win_delay_load_hook': 'false',
      'includes': [ 'deps/filename_rules.gypi' ],
      'include_dirs': [
        '.',
        'src',
        'src/third_party/kizunapi',
        'deps/libyue/include',
        'deps/libyue/src/<(OS)',
      ],
      'sources': [
        '<@(libyue_sources)',
        '<@(napi_yue_sources)',
      ],

      'conditions': [
        ['OS=="mac"', {
          'defines': [
            'SYSTEM_NATIVE_UTF8',
          ],

          'link_settings': {
            'libraries': [
              '$(SDKROOT)/System/Library/Frameworks/AppKit.framework',
              '$(SDKROOT)/System/Library/Frameworks/IOKit.framework',
              '$(SDKROOT)/System/Library/Frameworks/Security.framework',
              '$(SDKROOT)/System/Library/Frameworks/WebKit.framework',
              '$(SDKROOT)/System/Library/Frameworks/OpenDirectory.framework',
            ],
          },
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',  # required by yoga
            'CLANG_CXX_LANGUAGE_STANDARD': 'c++20',
            'MACOSX_DEPLOYMENT_TARGET': '10.13',
            'DEAD_CODE_STRIPPING': 'YES',
            'WARNING_CFLAGS': [
              '-Wno-deprecated-declarations',
              '-Wno-missing-field-initializers',
            ],
          },
        }],

        ['OS=="linux"', {
          'variables': {
            'pkg_libs': 'fontconfig pangoft2 gtk+-3.0 x11 webkit2gtk-4.0',
          },
          'cflags_cc': [
            '-std=c++20',
            '-fexceptions',  # required by yoga
            '-fdata-sections',
            '-ffunction-sections',
            '-Wno-deprecated-declarations',
            '<!@(pkg-config --cflags <(pkg_libs))',
          ],
          'link_settings': {
            'ldflags': [
              '-Wl,--as-needed,--gc-section',
              '<!@(pkg-config --libs-only-L --libs-only-other <(pkg_libs))',
            ],
            'libraries': [
              '-lpthread',
              '-ldl',
              '-latomic',
              '<!@(pkg-config --libs-only-l <(pkg_libs))',
            ],
          },
        }],

        ['OS=="win"', {
          'defines': [
            '_WINDOWS', 'WIN32', 'WIN32_LEAN_AND_MEAN', 'NOMINMAX',
            '_UNICODE', 'UNICODE',
          ],
          'link_settings': {
            'libraries': [
              'setupapi.lib', 'powrprof.lib', 'ws2_32.lib', 'dbghelp.lib',
              'shlwapi.lib', 'version.lib', 'winmm.lib', 'wbemuuid.lib',
              'psapi.lib', 'dwmapi.lib', 'propsys.lib', 'comctl32.lib',
              'gdi32.lib', 'gdiplus.lib', 'urlmon.lib', 'userenv.lib',
              'uxtheme.lib', 'delayimp.lib', 'runtimeobject.lib',
            ],
          },
          'msvs_disabled_warnings': [
            4244,
          ],
          'msvs_settings': {
            'VCCLCompilerTool': {
              'AdditionalOptions': [
                '/std:c++20',
              ]
            },
            'VCLinkerTool': {
              'DelayLoadDLLs': [
                'comctl32.dll',
                'setupapi.dll',
                'powrprof.dll',
                'dwmapi.dll',
              ],
            },
          },
        }],
      ]
    }
  ]
}
