import {
    __assign,
    __rest
} from "tslib";
export * from './interfaces';
import {
    dset
} from 'dset';
import {
    pickBy
} from '../utils/pick';
import {
    validateEvent
} from '../validation/assertions';
/**
 * Internal settings object that is used internally by the factory
 */
var InternalEventFactorySettings = /** @class */ (function() {
    function InternalEventFactorySettings(settings) {
        var _a, _b;
        this.settings = settings;
        this.createMessageId = settings.createMessageId;
        this.onEventMethodCall = (_a = settings.onEventMethodCall) !== null && _a !== void 0 ? _a : (function() {});
        this.onFinishedEvent = (_b = settings.onFinishedEvent) !== null && _b !== void 0 ? _b : (function() {});
    }
    return InternalEventFactorySettings;
}());
var CoreEventFactory = /** @class */ (function() {
    function CoreEventFactory(settings) {
        this.settings = new InternalEventFactorySettings(settings);
    }
    CoreEventFactory.prototype.track = function(event, properties, options, globalIntegrations) {
        this.settings.onEventMethodCall({
            type: 'track',
            options: options
        });
        return this.normalize(__assign(__assign({}, this.baseEvent()), {
            event: event,
            type: 'track',
            properties: properties !== null && properties !== void 0 ? properties : {},
            options: __assign({}, options),
            integrations: __assign({}, globalIntegrations)
        }));
    };
    CoreEventFactory.prototype.page = function(category, page, properties, options, globalIntegrations) {
        var _a;
        this.settings.onEventMethodCall({
            type: 'page',
            options: options
        });
        var event = {
            type: 'page',
            properties: __assign({}, properties),
            options: __assign({}, options),
            integrations: __assign({}, globalIntegrations),
        };
        if (category !== null) {
            event.category = category;
            event.properties = (_a = event.properties) !== null && _a !== void 0 ? _a : {};
            event.properties.category = category;
        }
        if (page !== null) {
            event.name = page;
        }
        return this.normalize(__assign(__assign({}, this.baseEvent()), event));
    };
    CoreEventFactory.prototype.screen = function(category, screen, properties, options, globalIntegrations) {
        this.settings.onEventMethodCall({
            type: 'screen',
            options: options
        });
        var event = {
            type: 'screen',
            properties: __assign({}, properties),
            options: __assign({}, options),
            integrations: __assign({}, globalIntegrations),
        };
        if (category !== null) {
            event.category = category;
        }
        if (screen !== null) {
            event.name = screen;
        }
        return this.normalize(__assign(__assign({}, this.baseEvent()), event));
    };
    CoreEventFactory.prototype.identify = function(userId, traits, options, globalIntegrations) {
        this.settings.onEventMethodCall({
            type: 'identify',
            options: options
        });
        return this.normalize(__assign(__assign({}, this.baseEvent()), {
            type: 'identify',
            userId: userId,
            traits: traits !== null && traits !== void 0 ? traits : {},
            options: __assign({}, options),
            integrations: globalIntegrations
        }));
    };
    CoreEventFactory.prototype.group = function(groupId, traits, options, globalIntegrations) {
        this.settings.onEventMethodCall({
            type: 'group',
            options: options
        });
        return this.normalize(__assign(__assign({}, this.baseEvent()), {
            type: 'group',
            traits: traits !== null && traits !== void 0 ? traits : {},
            options: __assign({}, options),
            integrations: __assign({}, globalIntegrations), //
            groupId: groupId
        }));
    };
    CoreEventFactory.prototype.alias = function(to, from, // TODO: can we make this undefined?
        options, globalIntegrations) {
        this.settings.onEventMethodCall({
            type: 'alias',
            options: options
        });
        var base = {
            userId: to,
            type: 'alias',
            options: __assign({}, options),
            integrations: __assign({}, globalIntegrations),
        };
        if (from !== null) {
            base.previousId = from;
        }
        if (to === undefined) {
            return this.normalize(__assign(__assign({}, base), this.baseEvent()));
        }
        return this.normalize(__assign(__assign({}, this.baseEvent()), base));
    };
    CoreEventFactory.prototype.baseEvent = function() {
        return {
            integrations: {},
            options: {},
        };
    };
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    CoreEventFactory.prototype.context = function(options) {
        var _a;
        /**
         * If the event options are known keys from this list, we move them to the top level of the event.
         * Any other options are moved to context.
         */
        var eventOverrideKeys = [
            'userId',
            'anonymousId',
            'timestamp',
            'messageId',
        ];
        delete options['integrations'];
        var providedOptionsKeys = Object.keys(options);
        var context = (_a = options.context) !== null && _a !== void 0 ? _a : {};
        var eventOverrides = {};
        providedOptionsKeys.forEach(function(key) {
            if (key === 'context') {
                return;
            }
            if (eventOverrideKeys.includes(key)) {
                dset(eventOverrides, key, options[key]);
            } else {
                dset(context, key, options[key]);
            }
        });
        return [context, eventOverrides];
    };
    CoreEventFactory.prototype.normalize = function(event) {
        var _a, _b;
        var integrationBooleans = Object.keys((_a = event.integrations) !== null && _a !== void 0 ? _a : {}).reduce(function(integrationNames, name) {
            var _a;
            var _b;
            return __assign(__assign({}, integrationNames), (_a = {}, _a[name] = Boolean((_b = event.integrations) === null || _b === void 0 ? void 0 : _b[name]), _a));
        }, {});
        // filter out any undefined options
        event.options = pickBy(event.options || {}, function(_, value) {
            return value !== undefined;
        });
        // This is pretty trippy, but here's what's going on:
        // - a) We don't pass initial integration options as part of the event, only if they're true or false
        // - b) We do accept per integration overrides (like integrations.Amplitude.sessionId) at the event level
        // Hence the need to convert base integration options to booleans, but maintain per event integration overrides
        var allIntegrations = __assign(__assign({}, integrationBooleans), (_b = event.options) === null || _b === void 0 ? void 0 : _b.integrations);
        var _c = event.options ?
            this.context(event.options) :
            [],
            context = _c[0],
            overrides = _c[1];
        var options = event.options,
            rest = __rest(event, ["options"]);
        var evt = __assign(__assign(__assign(__assign({
            timestamp: new Date()
        }, rest), {
            context: context,
            integrations: allIntegrations
        }), overrides), {
            messageId: options.messageId || this.settings.createMessageId()
        });
        this.settings.onFinishedEvent(evt);
        validateEvent(evt);
        return evt;
    };
    return CoreEventFactory;
}());
export {
    CoreEventFactory
};
//# sourceMappingURL=index.js.map