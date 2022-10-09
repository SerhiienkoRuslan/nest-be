(function (React, adminjs, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var PasswordEdit = function PasswordEdit(props) {
    var onChange = props.onChange,
        property = props.property,
        record = props.record,
        resource = props.resource;

    var _useTranslation = adminjs.useTranslation(),
        tb = _useTranslation.translateButton;

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        showPassword = _useState2[0],
        togglePassword = _useState2[1];

    React.useEffect(function () {
      if (!showPassword) {
        onChange(property.name, '');
      }
    }, [onChange, property, showPassword]); // For new records always show the property

    if (!record.id) {
      return /*#__PURE__*/React__default["default"].createElement(adminjs.BasePropertyComponent.Password.Edit, props);
    }

    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, showPassword && /*#__PURE__*/React__default["default"].createElement(adminjs.BasePropertyComponent.Password.Edit, props), /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Text, {
      textAlign: "center"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      onClick: function onClick() {
        return togglePassword(!showPassword);
      },
      type: "button"
    }, showPassword ? tb('cancel', resource.id) : tb('changePassword', resource.id)))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component1 = PasswordEdit;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvcGFzc3dvcmRzL2NvbXBvbmVudHMvZWRpdC50c3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEVkaXRQcm9wZXJ0eVByb3BzLCBCYXNlUHJvcGVydHlDb21wb25lbnQsIHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcydcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuY29uc3QgUGFzc3dvcmRFZGl0OiBSZWFjdC5GQzxFZGl0UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBvbkNoYW5nZSwgcHJvcGVydHksIHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzXG4gIGNvbnN0IHsgdHJhbnNsYXRlQnV0dG9uOiB0YiB9ID0gdXNlVHJhbnNsYXRpb24oKVxuXG4gIGNvbnN0IFtzaG93UGFzc3dvcmQsIHRvZ2dsZVBhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93UGFzc3dvcmQpIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsICcnKVxuICAgIH1cbiAgfSwgW29uQ2hhbmdlLCBwcm9wZXJ0eSwgc2hvd1Bhc3N3b3JkXSlcblxuICAvLyBGb3IgbmV3IHJlY29yZHMgYWx3YXlzIHNob3cgdGhlIHByb3BlcnR5XG4gIGlmICghcmVjb3JkLmlkKSB7XG4gICAgcmV0dXJuIDxCYXNlUHJvcGVydHlDb21wb25lbnQuUGFzc3dvcmQuRWRpdCB7Li4ucHJvcHN9IC8+XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICB7c2hvd1Bhc3N3b3JkICYmIDxCYXNlUHJvcGVydHlDb21wb25lbnQuUGFzc3dvcmQuRWRpdCB7Li4ucHJvcHN9IC8+fVxuICAgICAgPEJveCBtYj1cInhsXCI+XG4gICAgICAgIDxUZXh0IHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gdG9nZ2xlUGFzc3dvcmQoIXNob3dQYXNzd29yZCl9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyB0YignY2FuY2VsJywgcmVzb3VyY2UuaWQpIDogdGIoJ2NoYW5nZVBhc3N3b3JkJywgcmVzb3VyY2UuaWQpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXNzd29yZEVkaXRcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IENvbXBvbmVudDEgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3Bhc3N3b3Jkcy9jb21wb25lbnRzL2VkaXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDEgPSBDb21wb25lbnQxIl0sIm5hbWVzIjpbIlBhc3N3b3JkRWRpdCIsInByb3BzIiwib25DaGFuZ2UiLCJwcm9wZXJ0eSIsInJlY29yZCIsInJlc291cmNlIiwidXNlVHJhbnNsYXRpb24iLCJ0YiIsInRyYW5zbGF0ZUJ1dHRvbiIsInVzZVN0YXRlIiwic2hvd1Bhc3N3b3JkIiwidG9nZ2xlUGFzc3dvcmQiLCJ1c2VFZmZlY3QiLCJuYW1lIiwiaWQiLCJSZWFjdCIsIkJhc2VQcm9wZXJ0eUNvbXBvbmVudCIsIkJveCIsIlRleHQiLCJCdXR0b24iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJDb21wb25lbnQxIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFJQSxJQUFNQSxZQUF5QyxHQUFHLFNBQTVDQSxZQUE0QyxDQUFDQyxLQUFELEVBQVc7RUFDM0QsRUFBQSxJQUFRQyxRQUFSLEdBQWlERCxLQUFqRCxDQUFRQyxRQUFSO0VBQUEsTUFBa0JDLFFBQWxCLEdBQWlERixLQUFqRCxDQUFrQkUsUUFBbEI7RUFBQSxNQUE0QkMsTUFBNUIsR0FBaURILEtBQWpELENBQTRCRyxNQUE1QjtFQUFBLE1BQW9DQyxRQUFwQyxHQUFpREosS0FBakQsQ0FBb0NJLFFBQXBDLENBQUE7O0VBQ0EsRUFBQSxJQUFBLGVBQUEsR0FBZ0NDLHNCQUFjLEVBQTlDO1FBQXlCQyxFQUF6QixtQkFBUUMsZUFBUixDQUFBOztJQUVBLElBQXVDQyxTQUFBQSxHQUFBQSxjQUFRLENBQUMsS0FBRCxDQUEvQztFQUFBLE1BQUEsVUFBQSxHQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxDQUFBO0VBQUEsTUFBT0MsWUFBUCxHQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQSxNQUFxQkMsY0FBckIsR0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7O0VBRUFDLEVBQUFBLGVBQVMsQ0FBQyxZQUFNO01BQ2QsSUFBSSxDQUFDRixZQUFMLEVBQW1CO0VBQ2pCUixNQUFBQSxRQUFRLENBQUNDLFFBQVEsQ0FBQ1UsSUFBVixFQUFnQixFQUFoQixDQUFSLENBQUE7RUFDRCxLQUFBO0tBSE0sRUFJTixDQUFDWCxRQUFELEVBQVdDLFFBQVgsRUFBcUJPLFlBQXJCLENBSk0sQ0FBVCxDQU4yRDs7RUFhM0QsRUFBQSxJQUFJLENBQUNOLE1BQU0sQ0FBQ1UsRUFBWixFQUFnQjtNQUNkLG9CQUFPQyx5QkFBQSxDQUFBLGFBQUEsQ0FBQ0MsNkJBQUQsQ0FBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsRUFBeUNmLEtBQXpDLENBQVAsQ0FBQTtFQUNELEdBQUE7O0VBRUQsRUFBQSxvQkFDRWMsd0NBQUNFLGdCQUFELEVBQUEsSUFBQSxFQUNHUCxZQUFZLGlCQUFJSyx3Q0FBQ0MsNkJBQUQsQ0FBdUIsUUFBdkIsQ0FBZ0MsSUFBaEMsRUFBeUNmLEtBQXpDLENBRG5CLGVBRUVjLHdDQUFDRSxnQkFBRCxFQUFBO0VBQUssSUFBQSxFQUFFLEVBQUMsSUFBQTtFQUFSLEdBQUEsZUFDRUYsd0NBQUNHLGlCQUFELEVBQUE7RUFBTSxJQUFBLFNBQVMsRUFBQyxRQUFBO0VBQWhCLEdBQUEsZUFDRUgsd0NBQUNJLG1CQUFELEVBQUE7RUFBUSxJQUFBLE9BQU8sRUFBRSxTQUFBLE9BQUEsR0FBQTtFQUFBLE1BQUEsT0FBTVIsY0FBYyxDQUFDLENBQUNELFlBQUYsQ0FBcEIsQ0FBQTtPQUFqQjtFQUFzRCxJQUFBLElBQUksRUFBQyxRQUFBO0tBQ3hEQSxFQUFBQSxZQUFZLEdBQUdILEVBQUUsQ0FBQyxRQUFELEVBQVdGLFFBQVEsQ0FBQ1MsRUFBcEIsQ0FBTCxHQUErQlAsRUFBRSxDQUFDLGdCQUFELEVBQW1CRixRQUFRLENBQUNTLEVBQTVCLENBRGhELENBREYsQ0FERixDQUZGLENBREYsQ0FBQTtFQVlELENBN0JEOztFQ0pBTSxPQUFPLENBQUNDLGNBQVIsR0FBeUIsRUFBekIsQ0FBQTtFQUVBRCxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLFVBQXZCLEdBQW9DQSxZQUFwQzs7Ozs7OyJ9
