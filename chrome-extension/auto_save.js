import badgeUtil from './lib/badgeUtil.js';
import getTabInfos from './lib/getTabInfos.js';
import SavedTabHistory from './lib/SavedTabHistory.js';

getTabInfos().then(SavedTabHistory.save).then(() => {
	document.getElementById('result').innerText = '保存完了';

	SavedTabHistory.getAll().then(items => {
		const tabSavedTimes = Object.keys(items);
		badgeUtil.show(tabSavedTimes);

		if (location.search.includes('auto-close')) {
			document.body.append('5秒後にタブを閉じます');
			setTimeout(window.close, 5 * 1000);
		}
	});
});
