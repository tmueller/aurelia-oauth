System.register(["aurelia-router", "aurelia-http-client", "./oauth-service", "./oauth-token-service", "./oauth-interceptor", "./oauth-authorize-step"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(framework, config) {
        var oauthService = framework.container.get(oauth_service_1.OAuthService);
        var oauthTokenService = framework.container.get(oauth_token_service_1.OAuthTokenService);
        var httpClient = framework.container.get(aurelia_http_client_1.HttpClient);
        var oauthInterceptor = framework.container.get(oauth_interceptor_1.default);
        config(oauthService, oauthTokenService);
        httpClient.configure(function (builder) { return builder.withInterceptor(oauthInterceptor); });
        framework.aurelia.start().then(function () {
            oauthService.setTokenOnRedirect();
            var appRouter = framework.container.get(aurelia_router_1.AppRouter);
            appRouter.pipelineProvider.steps.splice(2, 0, oauth_authorize_step_1.OAuthAuthorizeStep);
        });
    }
    exports_1("configure", configure);
    var aurelia_router_1, aurelia_http_client_1, oauth_service_1, oauth_token_service_1, oauth_interceptor_1, oauth_authorize_step_1;
    return {
        setters: [
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (oauth_token_service_1_1) {
                oauth_token_service_1 = oauth_token_service_1_1;
            },
            function (oauth_interceptor_1_1) {
                oauth_interceptor_1 = oauth_interceptor_1_1;
            },
            function (oauth_authorize_step_1_1) {
                oauth_authorize_step_1 = oauth_authorize_step_1_1;
            }
        ],
        execute: function () {
            exports_1("OAuthService", oauth_service_1.OAuthService);
            exports_1("OAuthTokenService", oauth_token_service_1.OAuthTokenService);
            exports_1("OAuthInterceptor", oauth_interceptor_1.default);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtb2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0EsbUJBQTBCLFNBQWlDLEVBQUUsTUFBaUQ7UUFFMUcsSUFBTSxZQUFZLEdBQWlCLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFNLGlCQUFpQixHQUFzQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1Q0FBaUIsQ0FBQyxDQUFDO1FBQ3hGLElBQU0sVUFBVSxHQUFlLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdDQUFVLENBQUMsQ0FBQztRQUNuRSxJQUFNLGdCQUFnQixHQUFxQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUV4QyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQUM7UUFFM0UsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDN0IsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFHbEMsSUFBSSxTQUFTLEdBQWMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQVMsQ0FBQyxDQUFDO1lBQ3hELFNBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUseUNBQWtCLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFNQSxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtb2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBBcHBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IE9BdXRoSW50ZXJjZXB0b3IgZnJvbSAnLi9vYXV0aC1pbnRlcmNlcHRvcic7XHJcbmltcG9ydCB7IE9BdXRoQXV0aG9yaXplU3RlcCB9IGZyb20gJy4vb2F1dGgtYXV0aG9yaXplLXN0ZXAnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcms6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24sIGNvbmZpZzogKG9hdXRoU2VydmljZSwgb2F1dGhUb2tlblNlcnZpY2UpID0+IHZvaWQpIHtcclxuXHJcbiAgICBjb25zdCBvYXV0aFNlcnZpY2UgPSA8T0F1dGhTZXJ2aWNlPmZyYW1ld29yay5jb250YWluZXIuZ2V0KE9BdXRoU2VydmljZSk7XHJcbiAgICBjb25zdCBvYXV0aFRva2VuU2VydmljZSA9IDxPQXV0aFRva2VuU2VydmljZT5mcmFtZXdvcmsuY29udGFpbmVyLmdldChPQXV0aFRva2VuU2VydmljZSk7XHJcbiAgICBjb25zdCBodHRwQ2xpZW50ID0gPEh0dHBDbGllbnQ+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoSHR0cENsaWVudCk7XHJcbiAgICBjb25zdCBvYXV0aEludGVyY2VwdG9yID0gPE9BdXRoSW50ZXJjZXB0b3I+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhJbnRlcmNlcHRvcik7XHJcblxyXG4gICAgY29uZmlnKG9hdXRoU2VydmljZSwgb2F1dGhUb2tlblNlcnZpY2UpO1xyXG5cclxuICAgIGh0dHBDbGllbnQuY29uZmlndXJlKGJ1aWxkZXIgPT4gYnVpbGRlci53aXRoSW50ZXJjZXB0b3Iob2F1dGhJbnRlcmNlcHRvcikpO1xyXG5cclxuICAgIGZyYW1ld29yay5hdXJlbGlhLnN0YXJ0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIG9hdXRoU2VydmljZS5zZXRUb2tlbk9uUmVkaXJlY3QoKTtcclxuXHJcbiAgICAgIC8vIEFkZCBhdXRob3JpemUgc3RlcCBiZWZvcmUgdmlldy1tb2RlbCBhY3RpdmF0ZSBwcmVkZWZpbmVkIHBpcGVsaW5lIHN0ZXBcclxuICAgICAgbGV0IGFwcFJvdXRlciA9IDxBcHBSb3V0ZXI+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoQXBwUm91dGVyKTtcclxuICAgICAgKDxhbnk+YXBwUm91dGVyKS5waXBlbGluZVByb3ZpZGVyLnN0ZXBzLnNwbGljZSgyLCAwLCBPQXV0aEF1dGhvcml6ZVN0ZXApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgT0F1dGhTZXJ2aWNlLFxyXG4gIE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gIE9BdXRoSW50ZXJjZXB0b3JcclxufSJdfQ==
