const getTabInfos = () => {
	return new Promise(resolve => {
		chrome.windows.getAll({
			populate: true,
		}, windows => {
			const tabInfos = windows.map(window => {
				return window.tabs.map(tab => {
					return {
						title: tab.title,
						url: tab.url,
						favIconUrl: tab.favIconUrl,
					};
				});
			});
			resolve(tabInfos);
		});
	});
};

export default getTabInfos;
