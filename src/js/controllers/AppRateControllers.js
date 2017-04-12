angular.module('blocktrail.wallet')
    .controller('AppRateCtrl', function($scope, $q, sdkService, trackingService, settingsService, AppRateService) {
        $scope.apprate = {
            feedbackMsg: "",
            starClicked: null
        };

        $scope.doLater = function() {
            AppRateService.updateStatus(AppRateService.APPRATE_STATUS.REMIND);
            trackingService.trackEvent(trackingService.EVENTS.APPRATE, {label: 'later'});

            $scope.close();
        };

        $scope.no = function() {
            AppRateService.updateStatus(AppRateService.APPRATE_STATUS.NO);
            trackingService.trackEvent(trackingService.EVENTS.APPRATE, {label: 'no'});

            $scope.close();
        };

        $scope.close = function() {
            $scope.popover.remove();
        };

        $scope.sendFeedback = function() {
            trackingService.trackEvent(trackingService.EVENTS.APPRATE, {label: 'feedback'});

            $q.when(sdkService.sdk())
                .then(function(sdk) {
                    return sdk.sendFeedback($scope.apprate.feedbackMsg);
                })
                .finally(function() {
                    $scope.close();
                })
        };

        $scope.rate = function() {
            AppRateService.updateStatus(AppRateService.APPRATE_STATUS.DONE);
            trackingService.trackEvent(trackingService.EVENTS.APPRATE, {label: 'rate'});

            $scope.close();
            AppRateService.navigateToAppStore();
        };

        $scope.clickStar = function(starClicked) {
            // remove half-size to grow the box and remove the ng-enter class to prevent it being animated when growing
            $scope.popover.modalEl.classList.remove("half-size", "ng-enter", "ng-enter-active");
            $scope.apprate.starClicked = starClicked;

            trackingService.trackEvent(trackingService.EVENTS.APPRATE_STAR, {label: starClicked + ' stars'});

            if (starClicked <= 3) {
                AppRateService.updateStatus(AppRateService.APPRATE_STATUS.NEGATIVE);
            }
        };
    }
);
