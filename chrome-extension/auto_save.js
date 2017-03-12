getTabInfos().then(SavedTabHistory.save).then(() => {
	document.getElementById("result").innerText = "保存完了";

	SavedTabHistory.getAll().then(items => {
		const count = Object.keys(items).length;
		badgeUtil.show(count);
	});
});
