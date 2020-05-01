import { writeFileSync } from 'fs';
import { decodeHtmlEntities } from 'he';

document.addEventListener("keydown", function(e) {
  	if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
		e.preventDefault();

		const contentElement = document.getElementById('content');

		if (contentElement.dataset.file_path) {
			writeFileSync(contentElement.dataset.file_path, decodeHtmlEntities(contentElement.innerHTML));
		}
	}
}, false);

