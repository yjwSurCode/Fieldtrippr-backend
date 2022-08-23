# ReactNative webview

# 用法

npm i react-native-webview

<!-- <WebView  ref={ (webView) => this.webView = webView }
        originWhitelist={ ['*'] }

        // 布尔值,指定WebView中是否启用JavaScript。只在Android上使用，因为在iOS上默认启用了JavaScript。
        javaScriptEnabled={ true }

        // 布尔值,指定是否开启DOM本地存储
        domStorageEnabled={ true }

        // 允许文件上传
        allowFileAccess={ true }

        // 在webView内部网页中，调用window.postMessage可以触发此属性对应的函数，通过event.nativeEvent.data获取接收到的数据，实现网页和RN之间的数据传递
        onMessage={ this._onMessage }

        //初始化调用方法---------RNwebview向h5发送数据
        onLoad={() => { this.handleInjectJavascript();}}

        // 加载时强制使用loading转圈视图，如果为true，webview可能会加载失败，显示为空白
        startInLoadingState={false}

        // webview加载错误页面
        renderError={this.renderErrorView}

        // 网络路径
        // 也可以为本地路径 source={ {uri: 'http://192.168.1.1111:8080/'} }
        source={ {uri: 'http://www.baidu.com/'} } /> -->

1：初始化调用方法---------RNwebview 向 h5 发送数据

 <!-- handleInjectJavascript = (data) => {
// 拼接数据为方法
const injectJavascriptStr = `(function() { window.WebViewBridge.onMessage(${JSON.stringify(data)}); })()`;
// 通过 injectJavaScript 将数据传递给 WebView 页面，并立即执行为 js
if(this.webView) {
this.webView.injectJavaScript(injectJavascriptStr)
}
} -->

如果有回调的结果，需要在 mounted 生命周期函数中，H5 接受数据

 <!-- mounted() {
  window.WebViewBridge = {
    onMessage: this._onMessage //在window上挂载一个onMessage方法，RN会调用
  }
  // 自定义事件后直接触发：
  const event = new Event('WebViewBridge')
  window.dispatchEvent(event);
},
methods: {
  // 接收 RN 发送的消息
  _onMessage(data) {
    let that = this;
    console.log('data ------- ',JSON.stringify(data)); // 'hello world'
  }
} -->

2：H5 向 RN 传递数据

  <!-- mounted() {初始化
  // 自定义事件后直接触发：
  const event = new Event('WebViewBridge');
  window.dispatchEvent(event);
},
methods: {
  // 向rn发送消息, 将值 'hello world' 挂载到 postMessage 
  _postMessage('hello world') {
      window.ReactNativeWebView.postMessage(data);
  }
} -->

RN 页面在接收到 h5 传输的数据之后执行 onMessage 函数方法。

<!--
<WebView ref={ (webView) => this.webView = webView }
onMessage={ this._onMessage }
source={ {uri: 'http://www.baidu.com/'} } />

_onMessage = (event) => {
      console.log('接收vue发来的消息onMessage', event.nativeEvent.data);
}
 -->

3:双向传值

  <!-- mounted() {
  window.WebViewBridge = {
    onMessage: this._onMessage,
    receiveMessage: this._receiveMessage //在window上挂载一个receiveMessage方法，RN自行调用
  }
  const event = new Event('WebViewBridge')
  window.dispatchEvent(event);
},
methods: {
  // 向rn发送消息
  _postMessage('wow,RN!!') {
      window.ReactNativeWebView.postMessage(data);   // 将值 'wow,RN!!' 挂载到 postMessage 
  },
  // 二次或多次接收RN发送消息
   _receiveMessage(data){
    let that = this;
    console.log('data receiveMessage-------  ',JSON.stringify(data));
   }
} -->

<!-- onMessage={ this._onMessage }
// 接受H5发送来的消息
_onMessage = (event) => {
      console.log('接收H5发来的消息onMessage', event.nativeEvent.data);

      const injectJavascriptStr =  `(function() {
	   window.WebViewBridge.receiveMessage(${JSON.stringify('hello,vue2!!! ')});
      })()`;
      this.webView.injectJavaScript(injectJavascriptStr);
} -->

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



参考地址：http://www.codebaoku.com/it-js/it-js-246420.html
https://blog.csdn.net/weixin_44666116/article/details/108273085