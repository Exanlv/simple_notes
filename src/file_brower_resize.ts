const file_browser_container = document.getElementById('file_browser_container');

let resize_file_browser = false;

document.getElementById('handle').onmousedown = function (event) {
	event.preventDefault();

	resize_file_browser = true;
};

document.onmousemove = function (event) {
	if (resize_file_browser) {
		file_browser_container.style.width = `${event.clientX}px`;
	}
}

document.onmouseup = function (event) {
	if (resize_file_browser)
		resize_file_browser = false;
};