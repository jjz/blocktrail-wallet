angular.module('blocktrail.wallet')
    .factory('trackingService', function(tuneTrackingService, $analytics) {

        var EVENTS = {
            OPEN: "open",
            REGISTRATION: "registration",
            LOGIN: "login",
            ACTIVATED: "activated",
            APPRATE_STAR: "apprate_star",
            APPRATE: "apprate"
        };

        var ANALYTICS_META = {
            "open": {  category: 'events' },
            "registration": {  category: 'events' },
            "login": {  category: 'events' },
            "activated": {  category: 'events' },
            "apprate": {  category: 'events' },
            "apprate_star": {  category: 'events' }
        };

        var trackEvent = function(event, meta) {
            tuneTrackingService.measureEvent(event);
            $analytics.eventTrack(event, angular.extend({}, ANALYTICS_META[event] || {}, meta || {}));
        };

        return {
            EVENTS: EVENTS,
            trackEvent: trackEvent
        }
    })
;
