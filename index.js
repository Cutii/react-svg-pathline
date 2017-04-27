'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PathLine = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var isCollinear = function isCollinear(p1, p2, p3) {
    return (p1.y - p2.y) * (p1.x - p3.x) == (p1.y - p3.y) * (p1.x - p2.x);
};

var moveTo = function moveTo(b, a, r) {
    var vector = { x: b.x - a.x, y: b.y - a.y };
    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var unitVector = { x: vector.x / length, y: vector.y / length };
    return { x: a.x + unitVector.x * r, y: a.y + unitVector.y * r };
};

var PathLine = function PathLine(_ref) {
    var points = _ref.points,
        r = _ref.r,
        other = _objectWithoutProperties(_ref, ['points', 'r']);

    var path = points.slice(1).reduce(function (acc, p, i, points) {
        var next = points[i + 1];
        var prev = acc[acc.length - 1];

        if (next && !isCollinear(prev.point, p, next)) {
            var before = moveTo(prev.point, p, r);
            var after = moveTo(next, p, r);
            return acc.concat({
                point: p,
                s: 'L ' + before.x + ' ' + before.y + ' S ' + p.x + ' ' + p.y + ' ' + after.x + ' ' + after.y + ' '
            });
        } else {
            return acc.concat({
                point: p,
                s: 'L ' + p.x + ' ' + p.y + ' '
            });
        };
    }, [{
        point: points[0],
        s: 'M ' + points[0].x + ' ' + points[0].y + ' '
    }]).map(function (p) {
        return p.s;
    }).join();
    return _react2.default.createElement('path', _extends({ d: path }, other));
};

exports.PathLine = PathLine;
PathLine.propTypes = {
    points: _propTypes2.default.array.isRequired,
    r: _propTypes2.default.number.isRequired
};
