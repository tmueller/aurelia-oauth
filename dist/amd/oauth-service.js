var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-token-service", "./url-hash-service", "./local-storage-service", "./oauth-polyfills"], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1) {
    "use strict";
    var OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
    var OAuthService = OAuthService_1 = (function () {
        function OAuthService(oAuthTokenService, urlHashService, localStorageService, eventAggregator) {
            var _this = this;
            this.oAuthTokenService = oAuthTokenService;
            this.urlHashService = urlHashService;
            this.localStorageService = localStorageService;
            this.eventAggregator = eventAggregator;
            this.configure = function (config) {
                if (_this.config) {
                    throw new Error('OAuthProvider already configured.');
                }
                if (config.loginUrl.substr(-1) === '/') {
                    config.loginUrl = config.loginUrl.slice(0, -1);
                }
                if (config.logoutUrl.substr(-1) === '/') {
                    config.logoutUrl = config.logoutUrl.slice(0, -1);
                }
                _this.config = oauth_polyfills_1.objectAssign(_this.defaults, config);
                var existingHash = window.location.hash;
                var pathDefault = window.location.href;
                if (existingHash) {
                    pathDefault = pathDefault.replace(existingHash, '');
                }
                if (pathDefault.substr(-1) === '#') {
                    pathDefault = pathDefault.slice(0, -1);
                }
                _this.config.redirectUri = config.redirectUri || pathDefault;
                return config;
            };
            this.isAuthenticated = function () {
                return _this.oAuthTokenService.getToken();
            };
            this.login = function () {
                var redirectUrl = _this.config.loginUrl + "?" +
                    ("response_type=" + _this.oAuthTokenService.config.name + "&") +
                    ("client_id=" + encodeURIComponent(_this.config.clientId) + "&") +
                    ("redirect_uri=" + encodeURIComponent(_this.config.redirectUri) + "&") +
                    ("nonce=" + encodeURIComponent(_this.getSimpleNonceValue()));
                if (_this.config.scope) {
                    redirectUrl += "&scope=" + encodeURIComponent(_this.config.scope);
                }
                if (_this.config.state) {
                    redirectUrl += "&state=" + encodeURIComponent(_this.config.state);
                }
                window.location.href = redirectUrl;
            };
            this.logout = function () {
                var redirectUrl = _this.config.logoutUrl + "?" +
                    (_this.config.logoutRedirectParameterName + "=" + encodeURIComponent(_this.config.redirectUri));
                window.location.href = redirectUrl;
                _this.oAuthTokenService.removeToken();
            };
            this.loginOnStateChange = function (toState) {
                if (toState && _this.isLoginRequired(toState) && !_this.isAuthenticated() && !_this.getTokenDataFromUrl()) {
                    if (_this.localStorageService.isStorageSupported()) {
                        var url = window.location.href;
                        if (!window.location.hash) {
                            url = _this.getBaseRouteUrl();
                        }
                        _this.localStorageService.set(OAUTH_STARTPAGE_STORAGE_KEY, url);
                    }
                    _this.login();
                    return true;
                }
                return false;
            };
            this.setTokenOnRedirect = function () {
                var tokenData = _this.getTokenDataFromUrl();
                if (!_this.isAuthenticated() && tokenData) {
                    _this.oAuthTokenService.setToken(tokenData);
                    if (_this.localStorageService.isStorageSupported() && _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY)) {
                        var startPage = _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY);
                        _this.localStorageService.remove(OAUTH_STARTPAGE_STORAGE_KEY);
                        window.location.href = startPage;
                    }
                    else {
                        window.location.href = _this.getBaseRouteUrl();
                    }
                    _this.eventAggregator.publish(OAuthService_1.LOGIN_SUCCESS_EVENT, tokenData);
                }
            };
            this.isLoginRequired = function (state) {
                var routeHasConfig = state.settings && state.settings.requireLogin !== undefined;
                var routeRequiresLogin = routeHasConfig && state.settings.requireLogin ? true : false;
                return routeHasConfig ? routeRequiresLogin : _this.config.alwaysRequireLogin;
            };
            this.getTokenDataFromUrl = function () {
                var hashData = _this.urlHashService.getHashData();
                var tokenData = _this.oAuthTokenService.createToken(hashData);
                return tokenData;
            };
            this.getBaseRouteUrl = function () {
                return window.location.origin + '/#/';
            };
            this.getSimpleNonceValue = function () {
                return ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
            };
            this.defaults = {
                loginUrl: null,
                logoutUrl: null,
                clientId: null,
                logoutRedirectParameterName: 'post_logout_redirect_uri',
                scope: null,
                state: null,
                alwaysRequireLogin: false
            };
        }
        Object.defineProperty(OAuthService, "LOGIN_SUCCESS_EVENT", {
            get: function () { return 'oauth:loginSuccess'; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OAuthService, "INVALID_TOKEN_EVENT", {
            get: function () { return 'oauth:invalidToken'; },
            enumerable: true,
            configurable: true
        });
        return OAuthService;
    }());
    OAuthService = OAuthService_1 = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
            url_hash_service_1.default,
            local_storage_service_1.default,
            aurelia_event_aggregator_1.EventAggregator])
    ], OAuthService);
    exports.OAuthService = OAuthService;
    var OAuthService_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEVBQUUsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCwyQkFBMkIsRUFBRSwwQkFBMEI7Z0JBQ3ZELEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxJQUFJO2dCQUNYLGtCQUFrQixFQUFFLEtBQUs7YUFDNUIsQ0FBQztRQUNOLENBQUM7UUFsQkQsc0JBQWtCLG1DQUFtQjtpQkFBckMsY0FBa0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7O1dBQUE7UUFDaEYsc0JBQWtCLG1DQUFtQjtpQkFBckMsY0FBa0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7O1dBQUE7UUFrSnBGLG1CQUFDO0lBQUQsQ0F6SkEsQUF5SkMsSUFBQTtJQXpKWSxZQUFZO1FBRHhCLHlDQUFVLEVBQUU7eUNBV3NCLHVDQUFpQjtZQUNwQiwwQkFBYztZQUNULCtCQUFtQjtZQUN2QiwwQ0FBZTtPQWJuQyxZQUFZLENBeUp4QjtJQXpKWSxvQ0FBWSIsImZpbGUiOiJvYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UsIE9BdXRoVG9rZW5EYXRhIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IFVybEhhc2hTZXJ2aWNlIGZyb20gJy4vdXJsLWhhc2gtc2VydmljZSc7XHJcbmltcG9ydCBMb2NhbFN0b3JhZ2VTZXJ2aWNlIGZyb20gJy4vbG9jYWwtc3RvcmFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgb2JqZWN0QXNzaWduIH0gZnJvbSAnLi9vYXV0aC1wb2x5ZmlsbHMnO1xyXG5cclxuY29uc3QgT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZOiBzdHJpbmcgPSAnb2F1dGguc3RhcnRQYWdlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhDb25maWcge1xyXG4gICAgbG9naW5Vcmw6IHN0cmluZztcclxuICAgIGxvZ291dFVybDogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgIGxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZT86IHN0cmluZztcclxuICAgIHNjb3BlPzogc3RyaW5nO1xyXG4gICAgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICByZWRpcmVjdFVyaT86IHN0cmluZztcclxuICAgIGFsd2F5c1JlcXVpcmVMb2dpbj86IGJvb2xlYW47XHJcbn1cclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGNsYXNzIE9BdXRoU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogT0F1dGhDb25maWc7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0czogT0F1dGhDb25maWc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTE9HSU5fU1VDQ0VTU19FVkVOVCgpOiBzdHJpbmcgeyByZXR1cm4gJ29hdXRoOmxvZ2luU3VjY2Vzcyc7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElOVkFMSURfVE9LRU5fRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDppbnZhbGlkVG9rZW4nOyB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvQXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1cmxIYXNoU2VydmljZTogVXJsSGFzaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgbG9naW5Vcmw6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ291dFVybDogbnVsbCxcclxuICAgICAgICAgICAgY2xpZW50SWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZTogJ3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBudWxsLFxyXG4gICAgICAgICAgICBzdGF0ZTogbnVsbCxcclxuICAgICAgICAgICAgYWx3YXlzUmVxdWlyZUxvZ2luOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSA9IChjb25maWc6IE9BdXRoQ29uZmlnKTogT0F1dGhDb25maWcgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoUHJvdmlkZXIgYWxyZWFkeSBjb25maWd1cmVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoY29uZmlnLmxvZ2luVXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9naW5VcmwgPSBjb25maWcubG9naW5Vcmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dvdXRVcmwuc3Vic3RyKC0xKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5sb2dvdXRVcmwgPSBjb25maWcubG9nb3V0VXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5kZWZhdWx0cywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgLy8gUmVkaXJlY3QgaXMgc2V0IHRvIGN1cnJlbnQgbG9jYXRpb24gYnkgZGVmYXVsdFxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIGxldCBwYXRoRGVmYXVsdCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgbm90IG5lZWRlZCBwYXJ0cyBmcm9tIHVybHMuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nSGFzaCkge1xyXG4gICAgICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnJlcGxhY2UoZXhpc3RpbmdIYXNoLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGF0aERlZmF1bHQuc3Vic3RyKC0xKSA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcucmVkaXJlY3RVcmkgPSBjb25maWcucmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5vQXV0aFRva2VuU2VydmljZS5nZXRUb2tlbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgbG9naW4gPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgbGV0IHJlZGlyZWN0VXJsID0gYCR7dGhpcy5jb25maWcubG9naW5Vcmx9P2AgK1xyXG4gICAgICAgICAgICBgcmVzcG9uc2VfdHlwZT0ke3RoaXMub0F1dGhUb2tlblNlcnZpY2UuY29uZmlnLm5hbWV9JmAgK1xyXG4gICAgICAgICAgICBgY2xpZW50X2lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLmNsaWVudElkKX0mYCArXHJcbiAgICAgICAgICAgIGByZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcucmVkaXJlY3RVcmkpfSZgICtcclxuICAgICAgICAgICAgYG5vbmNlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuZ2V0U2ltcGxlTm9uY2VWYWx1ZSgpKX1gO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2NvcGUpIHtcclxuICAgICAgICAgICAgcmVkaXJlY3RVcmwgKz0gYCZzY29wZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5zY29wZSl9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnN0YXRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnN0YXRlKX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ291dCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ291dFVybH0/YCArXHJcbiAgICAgICAgICAgIGAke3RoaXMuY29uZmlnLmxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcucmVkaXJlY3RVcmkpfWA7XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XHJcbiAgICAgICAgdGhpcy5vQXV0aFRva2VuU2VydmljZS5yZW1vdmVUb2tlbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgbG9naW5PblN0YXRlQ2hhbmdlID0gKHRvU3RhdGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICBpZiAodG9TdGF0ZSAmJiB0aGlzLmlzTG9naW5SZXF1aXJlZCh0b1N0YXRlKSAmJiAhdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiAhdGhpcy5nZXRUb2tlbkRhdGFGcm9tVXJsKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0PHN0cmluZz4oT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZLCB1cmwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuT25SZWRpcmVjdCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB0aGlzLmdldFRva2VuRGF0YUZyb21VcmwoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIHRva2VuRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLnNldFRva2VuKHRva2VuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmlzU3RvcmFnZVN1cHBvcnRlZCgpICYmIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRQYWdlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZShPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzdGFydFBhZ2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWRpcmVjdCB0byB0aGUgYmFzZSBhcHBsaWNhdGlvbiByb3V0ZVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEJhc2VSb3V0ZVVybCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5MT0dJTl9TVUNDRVNTX0VWRU5ULCB0b2tlbkRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBpc0xvZ2luUmVxdWlyZWQgPSAoc3RhdGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICBjb25zdCByb3V0ZUhhc0NvbmZpZyA9IHN0YXRlLnNldHRpbmdzICYmIHN0YXRlLnNldHRpbmdzLnJlcXVpcmVMb2dpbiAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IHJvdXRlUmVxdWlyZXNMb2dpbiA9IHJvdXRlSGFzQ29uZmlnICYmIHN0YXRlLnNldHRpbmdzLnJlcXVpcmVMb2dpbiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdXRlSGFzQ29uZmlnID8gcm91dGVSZXF1aXJlc0xvZ2luIDogdGhpcy5jb25maWcuYWx3YXlzUmVxdWlyZUxvZ2luO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRva2VuRGF0YUZyb21VcmwgPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhc2hEYXRhID0gdGhpcy51cmxIYXNoU2VydmljZS5nZXRIYXNoRGF0YSgpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHRoaXMub0F1dGhUb2tlblNlcnZpY2UuY3JlYXRlVG9rZW4oaGFzaERhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gdG9rZW5EYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldEJhc2VSb3V0ZVVybCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy8jLyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTaW1wbGVOb25jZVZhbHVlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpICogTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgfVxyXG59Il19
