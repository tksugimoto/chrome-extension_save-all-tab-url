
const badgeUtil = {
	show: tabSavedTimes => {
		const count = tabSavedTimes.length;
		chrome.browserAction.setBadgeText({
			text: String(count)
		});
	}
};
