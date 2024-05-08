#!/usr/bin/env node

module.exports = function (context) {
	const fs = require("fs");
	const path = require("path");

	const platformRoot = path.join(context.opts.projectRoot, "platforms/android");
	const manifestFile = path.join(platformRoot, "AndroidManifest.xml");

	if (fs.existsSync(manifestFile)) {
		fs.readFile(manifestFile, "utf8", function (err, data) {
			if (err) {
				throw new Error("Unable to find AndroidManifest.xml: " + err);
			}

			let result;

			if (!/<application[^>]*\bandroid:banner/.test(data)) {
				console.log("Adding banner attribute");
				data = data.replace(
					/<application/g,
					'<application android:banner="@drawable/banner"'
				);
			}

			fs.writeFile(manifestFile, result, "utf8", function (err) {
				if (err) throw new Error("Unable to write into AndroidManifest.xml: " + err);
			});
		});
	}
};
