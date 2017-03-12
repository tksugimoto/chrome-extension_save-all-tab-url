
const badgeUtil = {
	show: count => {
		chrome.browserAction.setBadgeText({
			text: String(count)
		});
	}
};
