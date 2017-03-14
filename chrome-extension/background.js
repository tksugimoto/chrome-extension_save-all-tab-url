
const showHistoryCountBadge = () => {
	SavedTabHistory.getAll().then(items => {
		const tabSavedTimes = Object.keys(items);
		badgeUtil.show(tabSavedTimes);
	});
};

chrome.runtime.onInstalled.addListener(showHistoryCountBadge);


chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name === "every_midnight") {
		showHistoryCountBadge();
	}
});

chrome.alarms.create("every_midnight", {
	// 毎日深夜0時
	// 過去を指定しても繰り返し間隔を考慮して適切なタイミングを自動計算してくれる
	when: new Date("2017/01/01 00:00:00").getTime(),
	periodInMinutes: 60 * 24
});
