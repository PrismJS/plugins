export default () => {
	return {
		attributes: `data-autoloader-path="https://dev.prismjs.com/components/"`,
		includes: `
<style>
	.download-grammars {
		font: inherit;
		border: 0;
		padding: 0;
		margin: 0;
		background: none;
		text-decoration: underline;
		cursor: pointer;
	}
	.download-grammars.loading:after {
		content: ' [Generating... ' attr(data-progress) '%]';
	}
</style>
		`,
		scripts: `
<script src="https://staging.prismjs.com/assets/vendor/utopia.js"></script>
<script src="https://dev.prismjs.com/components.js"></script>
<script src="https://staging.prismjs.com/assets/vendor/jszip.min.js"></script>
<script src="https://staging.prismjs.com/assets/vendor/FileSaver.min.js"></script>
<script>
	function getZip(files, elt) {
		return new Promise(function (resolve, reject) {
			var zip = new JSZip();
			var l = files.length;
			var i = 0;
			var process = function () {
				elt.setAttribute('data-progress', Math.round(i / l * 100));
				if (i < l) {
					addFile(zip, files[i][0], files[i][1]).then(function () {
						i++;
						process();
					});
				} else {
					resolve(zip);
				}
			};
			process();
		});
	}

	function addFile(zip, filename, filepath) {
		return getFileContents(filepath).then(function (contents) {
			zip.file(filename, contents);
		});
	}

	function getFileContents(filepath) {
		return new Promise(function (resolve, reject) {
			$u.xhr({
				url: filepath,
				callback: function (xhr) {
					if (xhr.status < 400 && xhr.responseText) {
						resolve(xhr.responseText);
					} else {
						// Never rejected, ignore errors
						resolve();
					}
				}
			});
		});
	}

	$('.download-grammars').addEventListener('click', function () {
		var btn = this;
		if (btn.classList.contains('loading')) {
			return;
		}
		btn.classList.add('loading');
		btn.setAttribute('data-progress', 0);

		var files = [];
		for (var id in components.languages) {
			if (id === 'meta') {
				continue;
			}
			var basepath = "https://dev.prismjs.com/" + components.languages.meta.path.replace(/\{id}/g, id);
			var basename = basepath.substring(basepath.lastIndexOf('/') + 1);
			files.push([basename + '.js', basepath + '.js']);
			files.push([basename + '.min.js', basepath + '.min.js']);
		}

		getZip(files, btn).then(function (zip) {
			btn.classList.remove('loading');
			return zip.generateAsync({type: 'blob'});
		}).then(function (blob) {
			saveAs(blob, 'prism-components.zip');
		});
	});

</script>
		`,
	};
};
