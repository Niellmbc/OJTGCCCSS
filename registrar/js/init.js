let url = "http://gordoncollegeccs-ssite.net";     
$(document).ready(function() {
	$(".button-collapse").sideNav();
	$('.mdb-select').material_select();
	new WOW().init();
});
function getFormData(form) {
	let unindexed_array = form.serializeArray();
	let indexed_array = {};
	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value'];
	});
	return indexed_array;
}