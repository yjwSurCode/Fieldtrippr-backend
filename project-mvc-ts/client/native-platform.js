const win = window

console.log('plat-init', win.webkit, window.ReactNativeWebView)

const iosBridge = win.webkit && win.webkit.messageHandlers && win.ReactNativeWebView
const androidBridge = win.FNJSBridge;


class NativeBridge {
    /** 内部跳转的 schema */
    urlSchema = null;

    /**
     * 调用桥接接口
     *
     * @param method 方法名
     * @param param 桥接入参
     * @param cb 桥接回调
     */
    invokeBridge(method, param, cb) {
        const id = `_bridge_${bridgeIdx++}`;

        win[id] = (...args) => {
            if (cb) {
                cb(...args);
            }

            win[id] = null;
            try {
                delete win[id];
            } catch (e) {
                // do nothing
            }
        };

        /* ios */
        if (iosBridge) {
            const msg = JSON.stringify({
                methodName: method,
                param: param || '',
                callback: id,
            });
            iosBridge.postMessage(msg);
            /* android */
        } else if (androidBridge) {
            const result = androidBridge.callHandler(method, param ? JSON.stringify(param) : '', id);

            if (result != null && result !== '') {
                win[id](result);
            }
            /* 触屏 */
        } else {
            console.info(`invoke bridge: '${method}'`, param);
            win[id]();
        }
    }

    /**
     *  异步调用桥接
     *
     * @param method 方法名
     * @param param 桥接入参
     * @returns 桥接回调
     */
    invoke(method, param) {
        return new Promise((resolve) => {
            this.invokeBridge(method, param, (...args) => {
                console.info(`invoke 'bridge: ${method}', 'params: ${param}', 'result: ${args}'`);
                resolve(...args);
            });
        });
    }

    /**
     * 设置文档标题 返回值promise
     *
     * @param title 文档标题
     * @returns
     */
    async setTitle(title) {
        await this.invoke('setTitle', { title });
    }




    /**
     * 设置加载状态 返回值promise
     *
     * @param state true 为设置为加载中，false 为取消加载
     * @returns
     */
    async setLoadingState(state) {
        await this.invoke('setLoadingState', { state: !!state });
    }

    /**
     * 获取 Cookies 信息
     *
     * @returns Cookies 信息
     */
    async getNativeCookies() {
        return new Promise((resolve) => {
            if (iosBridge || androidBridge) {
                this.invokeBridge('getCookie', null, (nativeCookies) => {
                    let cookies = {};

                    if (nativeCookies) {
                        if (nativeCookies.substring(0, 1) === '"') {
                            nativeCookies = nativeCookies.substring(1, nativeCookies.length - 1);
                        }

                        cookies = new Function(`return ${nativeCookies}`)();
                    } else {
                        cookies = {};
                    }

                    // 格式化 cookies
                    const newCookies = {};

                    // 重新种入 cookies
                    for (const key of Object.keys(cookies)) {
                        const value = cookies[key];

                        if (value != null && value !== '') {
                            newCookies[key] = value;
                        }
                    }

                    resolve(newCookies);
                });
            } else {
                const cookies = Cookie.get();
                resolve(cookies);
            }
        });
    }


    // ---------------------------------------------------------------------------------------------------------------------

    //     /**
    //  * 直接跳转 NATIVE 页面 
    //  *
    //  * @param path 跳转路径
    //  * @returns
    //  */
    // async jumpToNative(path): Promise<void> {
    //     const url = await this.getNativeUrl(path);
    //     window.location.href = url;
    // }


    // /**
    //  * 获取跳转链接
    //  *
    //  * @param path 跳转路径
    //  * @returns 完整的跳转路径
    //  */
    // async getNativeUrl(path: string): Promise<string> {
    //     if (this.urlSchema == null) {
    //         const cookies = await this.getNativeCookies();

    //         if (cookies.yx_source === 'fn') {
    //             this.urlSchema = 'fnmart:';
    //         } else if (cookies.yx_source === 'ac') {
    //             this.urlSchema = 'actogo:';
    //         } else {
    //             this.urlSchema = 'fnfresh:';
    //         }
    //     }

    //     return `${this.urlSchema}${path}`;
    // }



    // /**
    //  * 手动触发微信分享
    //  *
    //  * @param shareInfo
    //  * @returns
    //  */
    // async wechatShare(
    //     shareInfo: NativeWechatShareInfo & {
    //         /**
    //          * 分享类型
    //          *
    //          * moments: 分享朋友圈
    //          * frineds: 分享朋友
    //          * all: 可以同时分享朋友圈和朋友
    //          */
    //         shareTarget: 'moments' | 'frineds' | 'all';
    //     },
    // ): Promise<void> {
    //     this.invokeBridge('wechatShare', shareInfo);
    // }

    // /**
    //  * 设置顶部导航微信分享（进页面调用）
    //  *
    //  * @param shareInfo
    //  * @returns
    //  */
    // async setNavWechatShare(shareInfo: NativeWechatShareInfo): Promise<void> {
    //     this.invokeBridge('setNavWechatShare', shareInfo);
    // }

    // /**
    //  * 微信分享图片
    //  *
    //  * @param shareInfo
    //  * @returns
    //  */
    // async wechatShareImage(shareInfo: {
    //     /**
    //      * shareImageData: 图片的BASE64
    //      * shareTarget: 分享类型 moments-分享朋友圈、friends- 分享朋友、all-可以同时分享朋友圈和朋友
    //      */
    //     shareImageData: string;
    //     shareTarget: 'moments' | 'all' | 'friends';
    // }): Promise<void> {
    //     shareInfo = {
    //         ...shareInfo,
    //         shareImageData: shareInfo.shareImageData.replace(/^data:(.*);base64,\s*/, ''),
    //     };

    //     this.invokeBridge('wechatShareImage', shareInfo);
    // }
    // /**
    //  * 保存图片到相册
    //  *
    //  * @param shareImageData 图片的BASE64
    //  * @returns
    //  */
    // async shareImageToAlbum(shareImageData: string): Promise<void> {
    //     const imageData = shareImageData.replace(/^data:(.*);base64,\s*/, '');

    //     this.invokeBridge('shareImageToAlbum', {
    //         shareImageData: imageData,
    //     });
    // }

    // /**
    //  * 设置登录验证参数
    //  *
    //  * @param params 登录验证参数
    //  */
    // async setLoginCaptcha(params: {
    //     captchaType: 'nc' | 'sc';
    //     scene: string;
    //     token: string;
    //     sessionId: string;
    //     sig: string;
    // }): Promise<void> {
    //     this.invokeBridge('setLoginCaptcha', params);
    // }

    // /**
    //  * 获取手机经纬度
    //  *
    //  * @returns
    //  */
    // async getLocation(): Promise<
    //     | {
    //         /** 精度 如果没有获取到用户定位则不传 */
    //         longitude: string | number;

    //         /** 纬度 如果没有获取到用户定位则不传 */
    //         latitude: string | number;
    //     }
    //     | undefined
    // > {
    //     let param = (await this.invoke('getLocation', null)) || {};

    //     if (typeof param === 'string') {
    //         param = JSON.parse(param || '{}');
    //     }

    //     const latitude = param.latitude || 0;
    //     const longitude = param.longitude || 0;

    //     if (longitude !== 0 && longitude !== '0' && latitude !== 0 && latitude !== '0') {
    //         return {
    //             longitude,
    //             latitude,
    //         };
    //     }
    // }


}

export const NATIVE_BRIDGE = new NativeBridge();