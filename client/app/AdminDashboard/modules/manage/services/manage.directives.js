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
/*.directive('uiselectValidation', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attributes, ngModel) {
            console.log(attributes);
            ngModel.$validators.uiselectValidation = function(modelValue) {
                return modelValue ? true : false;
            };

            scope.$watch('newAd.weekDays', function(n) {
                console.log("test validation " + n);

                ngModel.$validate();
            });
            scope.$watch('newAd.screensId', function(n) {
                console.log("test validation " + n);


                ngModel.$validate();
            });
            scope.$watch('newAd.templateName', function(n) {
                console.log("test validation " + n);

                ngModel.$validate();
            });
        }
    };*/
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
});