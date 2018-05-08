/*!
 * 与服务器交互数据
 * @Author: daceyu <daceyu@aliyun.com> 
 */

/**
 * 获取数据
 * @param {Function} cb: 回调函数
 */
let getData = (cb) => {
	let data = [{ 
		title: "learn react",
		completed: true
	}, { 
		title: "finsh homeword",
		completed: false
	}];
	
	cb(data);
}

export default {
	getData
}