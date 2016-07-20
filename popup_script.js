
document.getElementById("save").addEventListener("click", () => {
	getTabInfos().then(save);
});

getTabInfos().then(tabInfos => {
	let container = document.getElementById("nowTabs");
	tabInfos.forEach(tabs => {
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(`${tabs.length}個のタブ`));
		container.appendChild(li);

		let ol = document.createElement("ol");
		li.appendChild(ol);
		tabs.forEach(tab => {
			let li = document.createElement("li");
			li.appendChild(document.createTextNode(tab.title));
			ol.appendChild(li);
		});
	});
});

getAll().then(items => {
	let container = document.getElementById("history");
	Object.keys(items).forEach(key => {
		let tabInfos = items[key];
		let date = new Date(parseInt(key));

		let li = document.createElement("li");
		li.innerText = date.toLocaleString();

		let button = document.createElement("button");
		button.innerText = `${tabInfos.length}個のwindowを開く`;
		button.addEventListener("click", () => {
			tabInfos.forEach(tabs => {
				chrome.windows.create({
					url: tabs.map(tab => tab.url)
				});
			});
		});

		li.appendChild(button);
		container.appendChild(li);
	});
});

function getTabInfos() {
	return new Promise(resolve => {
		chrome.windows.getAll({	
			populate: true
		}, windows => {
			let tabInfos = windows.map(window => {
				return window.tabs.map(tab => {
					return {
						title: tab.title,
						url: tab.url,
						favIconUrl: tab.favIconUrl
					};
				});
			});
			resolve(tabInfos);
		});
	});
}

function save(tabInfos) {
	return new Promise(resolve => {
		let items = {};
		let key = Date.now().toString();
		items[key] = tabInfos;
		chrome.storage.local.set(items, () => {
			resolve(key);
		});
	});
}

function get(key) {
	return new Promise(resolve => {
		chrome.storage.local.get(key, items => {
			let item = items[key];
			resolve(item);
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
