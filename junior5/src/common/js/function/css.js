/*!
 * css处理
 * @Author: daceyu <daceyu@aliyun.com>
 * @build time: 2017.12.13
 */


/**
 * 获得css前缀
 * @return {String} css前缀
 */
export function getPrefix () {
    var prefix;
    var vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o'
    };

    var testEl = document.createElement('div');
    if (testEl.style.transform === undefined) {
        for (var i in vendors) {
            if (testEl.style[i + 'TransitionProperty'] !== undefined) {
                return vendors[i];
            }
        }
    } else return ''
}