var modal = require('./render-modal').default;
var sgroupSpecialDialog = require('./sgroup-special').sgroupSpecialDialog;

var openDialog = require('./open').default;
var saveDialog = require('./save').default;
var labelEdit = require('./labeledit').default;
var periodTable = require('./period-table').default;
var genericGroups = require('./generic-groups').default;
var templatesDialog = require('./template-lib');
var rgroupDialog = require('./rgroup').default;
var aboutDialog = require('./about').default;
var recognizeDialog = require('./recognize').default;
var analyseDialog = require('./analyse').default;
var helpDialog = require('./help').default;
var miewDialog = require('./miew').default;
var attachDialog = require('./attach').default;

// schemify dialogs
var bondDialog = require('./bond').default;
var Atom = require('./atom').default;
var attachmentPointsDialog = require('./attach-points').default;
var automapDialog = require('./automap').default;
var rgroupLogicDialog = require('./rgroup-logic').default;
var sgroupDialog = require('./sgroup').default;
var checkDialog = require('./check').default;
var settingsDialog = require('./settings').default;

templatesDialog.default.init = templatesDialog.init;

module.exports = {
	periodTable: periodTable,
	rgroup: rgroupDialog,
	genericGroups: genericGroups,
	attachmentPoints: attachmentPointsDialog,
	atomProps: modal(Atom),
	bondProps: bondDialog,
	automap: automapDialog,
	rgroupLogic: rgroupLogicDialog,
	sgroup: sgroupDialog,
	sgroupSpecial: sgroupSpecialDialog,
	open: openDialog,
	save: saveDialog,
	templates: templatesDialog.default,
	labelEdit: labelEdit,
	about: aboutDialog,
	recognize: recognizeDialog,
	check: checkDialog,
	analyse: analyseDialog,
	settings: settingsDialog,
	help: helpDialog,
	miew: miewDialog,
	attach: attachDialog
};
