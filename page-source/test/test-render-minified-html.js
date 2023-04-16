/* global describe, it, before */

/* tests/middlewares/render-minified.js */
/* by @rafaelverger */

var assert = require('assert'),
	sinon = require('sinon'),
	renderMinified = require('../../app/config/middlewares/render-minified');

describe('render-minified.js', function () {
	var renderSpy, renderNextSpy, resMock;

	before(function () {
		renderSpy = sinon.spy();
		renderNextSpy = sinon.spy();
		resMock = { render: renderSpy };
		renderMinified({}, resMock, renderNextSpy);
	});

	it('ensure response.render was overwritten by renderMinified module', function () {
		assert(renderSpy !== resMock.render);
		assert(renderSpy === resMock.oldRender);
		assert(renderNextSpy.calledOnce);
		assert(renderNextSpy.calledWithExactly());
	});

	it('ensure the new render function calls old one', function () {
		var a = 'index.html',
			b = { foo: 'bar' };

		resMock.render(a, b);
		assert(renderSpy.calledOnce);
		assert(renderSpy.calledWith(a, b));
	});
});
