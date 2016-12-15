getTabInfos().then(SavedTabHistory.save).then(() => {
	document.getElementById("result").innerText = "保存完了";
});
