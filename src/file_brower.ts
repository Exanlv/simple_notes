const base_dir = '/home/exan/simple_notes';

const file_browser = document.getElementById('file_browser');

import { readdirSync, lstatSync, readFileSync } from 'fs';
import { encode as encodeHtmlEntities } from 'he';

const order_files = (file_names: Array<string>, path: string): Array<string> => {
	file_names.sort();

	file_names.sort((a: string, b: string): number => {
		return Number(lstatSync(`${path}/${b}`).isDirectory()) - Number(lstatSync(`${path}/${a}`).isDirectory());
	});

	return file_names;
}

const format_folder = (path: string, title: string, display: boolean = false): HTMLElement => {
	const container = document.createElement('div');

	const container_title = document.createElement('div');
	container_title.className = 'title';
	container_title.innerHTML = title;

	container_title.onclick = function (e) {
		let self = this as HTMLElement;

		Array.from(self.parentElement.children).forEach((el: HTMLDivElement) => {
			if (el.className === 'children_container') {
				if (el.dataset.open === 'true') {
					el.dataset.open = 'false';
					el.style.display = 'none';
				} else {
					el.dataset.open = 'true';
					el.style.display = 'block';
				}
			}
		})
	}

	container.appendChild(container_title);

	const children_container = document.createElement('div');
	children_container.className = 'children_container';

	children_container.style.padding = '0 0 0 25px';

	order_files(readdirSync(path), path).forEach((file) => {
		const sub_file_path = `${path}/${file}`;
		if (lstatSync(sub_file_path).isDirectory()) {
			children_container.appendChild(
				format_folder(
					sub_file_path,
					file
				)
			);
			return;
		}

		const itemElement = document.createElement('div');
		itemElement.className = 'item';
		itemElement.innerHTML = file;
		itemElement.dataset.file_path = sub_file_path;

		itemElement.onclick = function () {
			let self = this as HTMLElement;

			const contentElement = document.getElementById('content');

			contentElement.innerHTML = encodeHtmlEntities(
				String(
					readFileSync(
						self.dataset.file_path
					)
				)
			);

			contentElement.dataset.file_path = self.dataset.file_path;
		}

		children_container.appendChild(itemElement);
	});

	if (!display) {
		children_container.style.display = 'none';
		children_container.dataset.open = 'false';
	} else {
		children_container.dataset.open = 'true';
	}

	container.appendChild(children_container);

	return container;
}

file_browser.appendChild(format_folder(base_dir, 'Notebooks', true))