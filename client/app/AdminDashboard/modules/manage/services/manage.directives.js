angular.module('dashboard.manage')
    .animation('.slide-toggle', ['$animateCss', function($animateCss) {
    var lastId = 0;
    var _cache = {};

    function getId(el) {
        var id = el[0].getAttribute("data-slide-toggle");
        if (!id) {
            id = ++lastId;
            el[0].setAttribute("data-slide-toggle", id);
        }
        return id;
    }
    function getState(id) {
        var state = _cache[id];
        if (!state) {
            state = {};
            _cache[id] = state;
        }
        return state;
    }

    function generateRunner(closing, state, animator, element, doneFn) {
        return function() {
            state.animating = true;
            state.animator = animator;
            state.doneFn = doneFn;
            animator.start().finally(function() {
                if (closing && state.doneFn === doneFn) {
                    element[0].style.height = '';
                }
                state.animating = false;
                state.animator = undefined;
                state.doneFn();
            });
        }
    }

    return {
        addClass: function(element, className, doneFn) {
            if (className == 'ng-hide') {
                var state = getState(getId(element));
                var height = (state.animating && state.height) ?
                    state.height : element[0].offsetHeight;

                var animator = $animateCss(element, {
                    from: {height: height + 'px', opacity: 1},
                    to: {height: '0px', opacity: 0}
                });
                if (animator) {
                    if (state.animating) {
                        state.doneFn =
                            generateRunner(true,
                                state,
                                animator,
                                element,
                                doneFn);
                        return state.animator.end();
                    }
                    else {
                        state.height = height;
                        return generateRunner(true,
                            state,
                            animator,
                            element,
                            doneFn)();
                    }
                }
            }
            doneFn();
        },
        removeClass: function(element, className, doneFn) {
            if (className == 'ng-hide') {
                var state = getState(getId(element));
                var height = (state.animating && state.height) ?
                    state.height : element[0].offsetHeight;

                var animator = $animateCss(element, {
                    from: {height: '0px', opacity: 0},
                    to: {height: height + 'px', opacity: 1}
                });

                if (animator) {
                    if (state.animating) {
                        state.doneFn = generateRunner(false,
                            state,
                            animator,
                            element,
                            doneFn);
                        return state.animator.end();
                    }
                    else {
                        state.height = height;
                        return generateRunner(false,
                            state,
                            animator,
                            element,
                            doneFn)();
                    }
                }
            }
            doneFn();
        }
    };
}])
    .directive('scrollIf', ['$document', '$timeout', function($document, $timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $scope.$watch($attrs.scrollIf, function(value) {
                if (value) {
                    $timeout(function() {
                        $document.scrollToElementAnimated($element, 55, 1000);
                    }, 0);
                }
            });
        }
    }
}])

    .directive('uiSelectRequired', function () { return { require: 'ngModel', link: function (scope, elm, attrs, ctrl) { ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

        var determineVal;
        if (angular.isArray(modelValue)) {
            determineVal = modelValue;
        } else if (angular.isArray(viewValue)) {
            determineVal = viewValue;
        } else {
            return false;
        }

        return determineVal.length > 0;
    };
    }
    };
}).directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);