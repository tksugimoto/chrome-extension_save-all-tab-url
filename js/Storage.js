
function save(tabInfos) {
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
}

function getAll() {
	return new Promise(resolve => {
		chrome.storage.local.get(items => {
			resolve(items);
		});
	});
}

function remove(key) {
	return new Promise(resolve => {
		chrome.storage.local.remove(key, resolve);
	});
}
