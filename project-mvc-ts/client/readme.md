# ReactNative webview

## automaticallyAdjustContentInsets

控制是否调整放置在导航条、标签栏或工具栏后面的 web 视图的内容。默认值为 true

## contentInset {top: number, left: number, bottom: number, right: number}

设置网页内嵌边距

## injectedJavaScript

设置在网页加载之前注入一段 js 代码

## mediaPlaybackRequiresUserAction

设置页面中的 HTML5 音视频是否需要在用户点击后再开始播放。默认值为 true

## scalesPageToFit

设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。

## source

在 WebView 中指定加载内容 html 或者 url,可以指定 header,method 等

## startInLoadingState

强制 WebView 在第一次加载时先显示 loading 视图。默认为 true

## domStorageEnabled（android）

布尔值,指定是否开启 DOM 本地存储

## javaScriptEnabled（android）

布尔值,指定 WebView 中是否启用 JavaScript。只在 Android 上使用，因为在 iOS 上默认启用了 JavaScript。

## mixedContentMode(android)

指定混合内容模式。即 WebView 是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,
‘never’ (默认) - WebView 不允许安全链接页面中加载非安全链接的内容
‘always’ - WebView 允许安全链接页面中加载非安全链接的内容。
‘compatibility’ - WebView 会尽量和浏览器当前对待此情况的行为一致
userAgent(android)
为 WebView 设置 user-agent 字符串标识。这一字符串也可以在原生端用 WebViewConfig 来设置，但 js 端的设置会覆盖原生端的设置。

## allowsInlineMediaPlayback（ios）

指定 HTML5 视频是在网页当前位置播放还是使用原生的全屏播放器播放。 默认值为 false,视频在网页播放还需要设置 webkit-playsinline
bounces(ios)
指定滑动到边缘后是否有回弹效果。
decelerationRate（ios）
指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如"normal"和"fast"，
scrollEnabled（ios）
是否启用滚动

# 函数

## injectJavaScript

函数接受一个字符串，该字符串将传递给 WebView，并立即执行为 JavaScript

## onError

加载失败时回调

## onLoad

完成加载时回调

## onLoadEnd

加载成功或者失败都会回调

## onLoadStart

开始加载的时候回调

## onMessage

在 webView 内部网页中，调用 window.postMessage 可以触发此属性对应的函数，通过 event.nativeEvent.data 获取接收到的数据，实现网页和 RN 之间的数据传递

## renderError

返回一个视图用来提示用户错误

## renderLoading

返回一个加载指示器

## onShouldStartLoadWithRequest(ios)

请求自定义处理，返回 true 或 false 表示是否要继续执行响应的请求
