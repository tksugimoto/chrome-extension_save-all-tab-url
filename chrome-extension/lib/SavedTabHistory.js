const SavedTabHistory = {
	save: tabInfos => {
		return new Promise(resolve => {
			const items = {};
			const key = Date.now().toString();
			items[key] = tabInfos;
			chrome.storage.local.set(items, () => {
				resolve({
					key,
					tabInfos
				});
			});
		});
	},

	getAll: () => {
		return new Promise(resolve => {
			chrome.storage.local.get(items => {
				resolve(items);
			});
		});
	},

	remove: key => {
		return new Promise(resolve => {
			chrome.storage.local.remove(key, resolve);
		});
	}
};
