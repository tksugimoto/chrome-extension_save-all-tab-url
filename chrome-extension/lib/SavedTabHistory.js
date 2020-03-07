const TabHistoryKey = {
	createKey: () => {
		return Date.now().toString();
	},
	isKeyString: string => {
		return /^[0-9]+$/.test(string);
	},
};

const SavedTabHistory = {
	save: tabInfos => {
		return new Promise(resolve => {
			const items = {};
			const key = TabHistoryKey.createKey();
			items[key] = tabInfos;
			chrome.storage.local.set(items, () => {
				resolve({
					key,
					tabInfos,
				});
			});
		});
	},

	getAll: () => {
		return new Promise(resolve => {
			chrome.storage.local.get(items => {
				Object.keys(items).forEach(key => {
					if (!TabHistoryKey.isKeyString(key)) {
						delete items[key];
					}
				});
				resolve(items);
			});
		});
	},

	remove: key => {
		return new Promise(resolve => {
			chrome.storage.local.remove(key, resolve);
		});
	},
};

export default SavedTabHistory;
