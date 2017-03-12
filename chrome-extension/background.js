
const showHistoryCountBadge = () => {
	SavedTabHistory.getAll().then(items => {
		const count = Object.keys(items).length;
		badgeUtil.show(count);
	});
};

chrome.runtime.onInstalled.addListener(showHistoryCountBadge);
