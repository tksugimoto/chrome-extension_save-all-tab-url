
document.getElementById("save").addEventListener("click", () => {
	getTabInfos().then(save).then(({key, tabInfos}) => {
		History.appendHistory(key, tabInfos);
	});
});

getTabInfos().then(tabInfos => {
	const container = document.getElementById("nowTabs");
	tabInfos.forEach(tabs => {
		const details = document.createElement("details");

		const summary = document.createElement("summary");
		summary.style.cursor = "pointer";
		summary.appendChild(document.createTextNode(`${tabs.length}個のタブ`));
		details.appendChild(summary);

		const tabOl = document.createElement("ol");
		tabs.forEach(tab => {
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(tab.title));
			tabOl.appendChild(li);
		});
		details.appendChild(tabOl);

		const li = document.createElement("li");
		li.appendChild(details);
		container.appendChild(li);
	});

	const windowCount = tabInfos.length;
	const tabCount = tabInfos.reduce((sum, tabs) => {
		return sum + tabs.length;
	}, 0);
	document.getElementById("info").innerText = `window: ${windowCount}, tab: ${tabCount}`;
});

const History = {
	container: document.getElementById("history"),
	appendHistory: function (key, tabInfos) {
		const date = new Date(parseInt(key)).toLocaleString()
			.replace(/([/ :])(\d)(?!\d)/g, (match, sep, num) => {
				// 数字が1桁しかない場合は2桁にする
				return `${sep}0${num}`
			});

		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = createDownloadLink(tabInfos);
		a.innerText = date;
		a.target = "_blank";
		a.download = `${date}.json`;
		li.appendChild(a);

		const button = document.createElement("button");
		button.innerText = `${tabInfos.length}個のwindowを開く`;
		button.addEventListener("click", () => {
			if (window.confirm(`${tabInfos.length}個のwindowを開いてよいですか？`)) {
				tabInfos.forEach(tabs => {
					chrome.windows.create({
						url: tabs.map(tab => tab.url)
					});
				});
			}
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
	Object.keys(items).forEach(key => {
		const tabInfos = items[key];
		History.appendHistory(key, tabInfos);
	});
});

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

function get(key) {
	return new Promise(resolve => {
		chrome.storage.local.get(key, items => {
			const item = items[key];
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
	const text = JSON.stringify(obj, null, "\t");
	const blob = new Blob([
		text
	], {
		type: "application/json"
	});
	return window.URL.createObjectURL(blob);
}
