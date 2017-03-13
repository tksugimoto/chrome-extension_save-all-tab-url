
const showHistoryCountBadge = () => {
	SavedTabHistory.getAll().then(items => {
		const tabSavedTimes = Object.keys(items);
		badgeUtil.show(tabSavedTimes);
	});
};

chrome.runtime.onInstalled.addListener(showHistoryCountBadge);
