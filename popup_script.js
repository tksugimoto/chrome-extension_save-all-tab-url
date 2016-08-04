
document.getElementById("save").addEventListener("click", () => {
	getTabInfos().then(save).then(({key, tabInfos}) => {
		History.appendHistory(key, tabInfos);
	});
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

const History = {
	container: document.getElementById("history"),
	appendHistory: function (key, tabInfos) {
		let date = new Date(parseInt(key)).toLocaleString();

		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = createDownloadLink(tabInfos);
		a.innerText = date;
		a.target = "_blank";
		a.download = `${date}.json`;
		li.appendChild(a);

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

		const delButton = document.createElement("button");
		delButton.innerText = "削除";
		delButton.addEventListener("click", () => {
			if (window.confirm("削除してよいですか？")) {
				remove(key).then(this.container.removeChild(li));
			}
		});
		li.appendChild(delButton);

		this.container.appendChild(li);
	}
};

getAll().then(items => {
	let container = document.getElementById("history");
	Object.keys(items).forEach(key => {
		let tabInfos = items[key];
		History.appendHistory(key, tabInfos);
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
			resolve({
				key,
				tabInfos
			});
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

function remove(key) {
	return new Promise(resolve => {
		chrome.storage.local.remove(key, resolve);
	});
}

function createDownloadLink(obj) {
	let text = JSON.stringify(obj, null, "\t");
	let blob = new Blob([
		text
	], {
		type: "application/json"
	});
	return window.URL.createObjectURL(blob);
}
