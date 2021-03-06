let express = require('express');
let router = express.Router();
let fs = require('fs');
let createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
	let tech = require(__dirname+'/../build/tech.json');
	res.render('index', {
		title: 'Accessibility Support',
		tech: tech
	});
});

router.get('/contribute', function(req, res, next) {
	let markdown = fs.readFileSync(__dirname+'/../CONTRIBUTING.md', 'utf8');
	let MarkdownIt = require('markdown-it');
	let md = new MarkdownIt().use(require('markdown-it-anchor'));
	let result = md.render(markdown);
	res.render('static-page', {
		title: 'Contributing | Accessibility Support',
		result: result
	});
});

router.get('/run-tests', function(req, res, next) {
	let supportPoints = require(__dirname+'/../build/support_points.json');
	res.render('run-tests', {
		title: 'Run Tests | Accessibility Support',
		supportPoints: supportPoints,
		ATBrowsers: require(__dirname+'/../data/ATBrowsers.json')
	});
});

router.get('/faq', function(req, res, next) {
	let markdown = fs.readFileSync(__dirname+'/../FAQ.md', 'utf8');
	let MarkdownIt = require('markdown-it');
	let md = new MarkdownIt().use(require('markdown-it-anchor'));
	let result = md.render(markdown);
	res.render('static-page', {
		title: 'FAQ | Accessibility Support',
		result: result
	});
});

router.get('/learn', function(req, res, next) {
	let markdown = fs.readFileSync(__dirname+'/../documentation/learn.md', 'utf8');
	let MarkdownIt = require('markdown-it');
	let md = new MarkdownIt().use(require('markdown-it-anchor'));
	let result = md.render(markdown);
	res.render('static-page', {
		title: 'Learn | Accessibility Support',
		result: result
	});
});

router.get('/learn/at/:id', function(req, res, next) {
	let allowed = ['dragon', 'jaws', 'narrator', 'nvda', 'talkback', 'vo_ios', 'vo_macos'];

	if (!allowed.includes(req.params.id)) {
		next(createError(404));
		return;
	}

	let markdown = fs.readFileSync(__dirname+'/../documentation/at/'+req.params.id+'.md', 'utf8');
	let MarkdownIt = require('markdown-it');
	let md = new MarkdownIt().use(require('markdown-it-anchor'));
	let result = md.render(markdown);
	res.render('static-page', {
		title: req.params.id + ' | Learn | Accessibility Support',
		result: result
	});
});

module.exports = router;
