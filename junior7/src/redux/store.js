/*!
 * 数据
 */

export default {
	title: "Todos",
	header: {
		placeholder: "What needs to be done?"
	},
	data: [],
	showIcon: true,
	completedAll: false,
	showFooter: true,
	footer: {
		func: ["All", "Active", "Completed"],
		current: "All",
		remain_text: "0 item left",
		showClear: false,
		clean_text: "clear completed"
	}
}