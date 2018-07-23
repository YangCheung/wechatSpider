
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.mobile = factory();
    }
}(this, function(){
    var browser = {
        isAndroid: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        isMobileQQ : function(){
            var ua = navigator.userAgent;
            return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua);
        },
        isIOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        isWx : function() {
            return navigator.userAgent.match(/micromessenger/i) ? true : false;
        }
    };

    var ua = window.navigator.userAgent;

    var appStore = "https://itunes.apple.com/cn/app/%E9%AD%94%E9%83%A8/id1383707003?mt=8";
    var androidStore = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shellcolr.cosmos";


    // 是否为Android下的chrome浏览器，排除mobileQQ；
    // Android下的chrome，需要通过特殊的intent 来唤醒
    // refer link：https://developer.chrome.com/multidevice/android/intents
    var isAndroidChrome = (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/))
                          && browser.isAndroid() && !browser.isMobileQQ();

    var downloadElement = document.querySelector(".go-appstore");
    var targetAppStore = androidStore
    window.goAppStore = function() {
        window.location.href = targetAppStore
    }
    // downloadElement.addEventListener("click", goAppStore, false);

    var setup = function() {
        if (browser.isIOS()) {
            targetAppStore = appStore
            if(browser.isWx()) {
                document.body.classList.add("open-in-ios-wechat")
            } else {
                document.body.classList.add("open-in-ios-browser")
            }
        } else {
            if(browser.isWx()) {
                document.body.classList.add("open-in-android-wechat")
            } else {
                document.body.classList.add("open-in-android-browser")
            }
        }
    }
    setup();
    return {
        generateSchema: function(targetUrl) {
            var localUrl  = window.location.href;
            var targetUrlStr = '';

            if (!targetUrl) {
                targetUrlStr = AppConfig.HOME;
            } else {
                targetUrlStr = targetUrl;
            }
            targetUrlStr = encodeURIComponent(targetUrlStr)
            if (isAndroidChrome) {
                targetUrlStr =  "intent://external?target=" + targetUrlStr +"#Intent;"  +
                             "scheme=mobu-web;"+
                             "package="  + AppConfig.APK_INFO.PKG      + ";"+
                            //  "category=" + AppConfig.APK_INFO.CATEGORY + ";"+
                             "action="   + AppConfig.APK_INFO.ACTION   + ";"+
                             "S.browser_fallback_url=" + encodeURIComponent(AppConfig.FAILBACK.ANDROID) + ";" +
                             "end";
            } else if(browser.isIOS()) {
                targetUrlStr = AppConfig.HOME + "/?target=" + targetUrlStr;
            } else {
                targetUrlStr = "mobu-web://external?target=" + targetUrlStr;
            }

            return targetUrlStr;
        },

    
        loadSchema: function(targetUri){
            var schemaUrl = this.generateSchema(targetUri);

            var iframe    = document.createElement("iframe"),
                aLink     = document.createElement("a"),
                body      = document.body,
                loadTimer = null;
            aLink.style.cssText = iframe.style.cssText = "display:none;width:0px;height:0px;";

            if (browser.isWx() && browser.isAndroid()) {
                window.location.href = AppConfig.FAILBACK.ANDROID;
            } else if (browser.isIOS()) {
                if (browser.isWx()) {
                    window.location.href = AppConfig.FAILBACK.IOS;
                } else {
                    aLink.href = schemaUrl;
                    body.appendChild(aLink);
                    aLink.click();
                }
            } else if (isAndroidChrome) {
                // Android chrome 不支持iframe 方式唤醒 适用：chrome,leibao,mibrowser,opera,360
                console.log("isAndroidChrome")
                aLink.href = schemaUrl;
                body.appendChild(aLink);
                aLink.click();   
            } else {
                // 适用：UC,sogou,firefox,mobileQQ
                console.log("other")
                body.appendChild(iframe);
                iframe.src = schemaUrl;
            }

            var start = Date.now(),
                that  = this;
            loadTimer = setTimeout(function() {
                if (document.hidden || document.webkitHidden) {
                    return;
                }
                if (Date.now() - start <= AppConfig.LOAD_WAITING + 300) {
                    window.location.href = browser.isIOS() ? AppConfig.FAILBACK.IOS : AppConfig.FAILBACK.ANDROID;
                }
            }, AppConfig.LOAD_WAITING);

            var visibilitychange = function() {
                if (document.hidden || document.webkitHidden) {
                    clearTimeout(loadTimer);
                }
            };
            document.addEventListener('visibilitychange', visibilitychange, false);
            document.addEventListener('webkitvisibilitychange', visibilitychange, false);
            window.addEventListener('pagehide', function() {
                clearTimeout(loadTimer);
            }, false);
        }
    };
}));