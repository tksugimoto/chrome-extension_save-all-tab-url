
const _defaultBrowserActionTitle = chrome.runtime.getManifest().browser_action.default_title;

const _defaultBackgroundColor = [0, 0, 0, 0];

const _changeBadgeInfoByTodaySavedStatus = tabSavedTimes => {
	const todayDateString = new Date().toDateString();
	const isSavedToday = tabSavedTimes.some(tabSavedTimeStr => {
		const tabSavedTime = parseInt(tabSavedTimeStr);
		const date = new Date(tabSavedTime);
		return todayDateString === date.toDateString();
	});
	const color = isSavedToday ? _defaultBackgroundColor : 'red';
	chrome.browserAction.setBadgeBackgroundColor({
		color,
	});
	const count = tabSavedTimes.length;
	const title = _defaultBrowserActionTitle + `
		保存件数: ${count}件
		今日の保存: ${isSavedToday ? 'あり（青）' : 'なし（赤）'}
		`.replace(/^\t+/mg, '');
	chrome.browserAction.setTitle({
		title,
	});
};

const show = tabSavedTimes => {
	const count = tabSavedTimes.length;
	chrome.browserAction.setBadgeText({
		text: String(count),
	});
	_changeBadgeInfoByTodaySavedStatus(tabSavedTimes);
};

export default {
	show,
};
