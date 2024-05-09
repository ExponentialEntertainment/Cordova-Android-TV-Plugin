#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

module.exports = function (context) {
	console.log("[ee-cordova-plugin-android-tv][afterPrepare]");

	const platformRoot = path.join(context.opts.projectRoot, "platforms/android");
	const manifestFile = path.join(platformRoot, "AndroidManifest.xml");
	console.log({ platformRoot, manifestFile });

	if (fs.existsSync(manifestFile)) {
		fs.readFile(manifestFile, "utf8", function (err, data) {
			console.log({ data });
			if (err) {
				console.error("[Unable to find AndroidManfiest.xml", JSON.stringify(err));
				throw new Error("Unable to find AndroidManifest.xml: " + err);
			}

			if (!/<application[^>]*\bandroid:banner/.test(data)) {
				console.log("[Adding banner attribute]");
				data = data.replace(
					/<application/g,
					'<application android:banner="@drawable/banner"'
				);
			} else {
				console.log("[Android:Banner already exists. Wont add.]");
			}

			fs.writeFile(manifestFile, data, "utf8", function (err) {
				if (err) throw new Error("Unable to write into AndroidManifest.xml: " + err);
			});
		});
	}
};
