
const badgeUtil = {
	_defaultBackgroundColor: [0, 0, 0, 0],
	_changeBackgroundColorByTodaySavedStatus: tabSavedTimes => {
		const todayDateString = new Date().toDateString();
		const isSavedToday = tabSavedTimes.some(tabSavedTimeStr => {
			const tabSavedTime = parseInt(tabSavedTimeStr);
			const date = new Date(tabSavedTime);
			return todayDateString === date.toDateString();
		});
		const color = isSavedToday ? badgeUtil._defaultBackgroundColor : "red";
		chrome.browserAction.setBadgeBackgroundColor({
			color
		});
	},
	show: tabSavedTimes => {
		const count = tabSavedTimes.length;
		chrome.browserAction.setBadgeText({
			text: String(count)
		});
		badgeUtil._changeBackgroundColorByTodaySavedStatus(tabSavedTimes);
	}
};
