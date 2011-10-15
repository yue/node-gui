exports.log = function Loggger (name, error, doc) {
	if (error) {
		console.error ('[' + name + ']', error);
	} else {
		console.log ('[' + name + ']', doc);
	}
}
