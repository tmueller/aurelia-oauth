"use strict";
var UrlHashService = (function () {
    function UrlHashService() {
        var _this = this;
        this.getHash = function () {
            var hash = window.location.hash;
            if (hash.indexOf('#/') > -1) {
                hash = hash.substring(hash.indexOf('#/') + 2);
            }
            else if (hash.indexOf('#') > -1) {
                hash = hash.substring(1);
            }
            return hash;
        };
        this.getHashData = function () {
            var hash = _this.getHash();
            var searchRegex = /([^&=]+)=?([^&]*)/g;
            var hashData = {};
            var match = searchRegex.exec(hash);
            while (match) {
                var parameter = _this.decodeUrlData(match[1]);
                var value = _this.decodeUrlData(match[2]);
                hashData[parameter] = value;
                match = searchRegex.exec(hash);
            }
            return hashData;
        };
        this.clearHash = function () {
            window.location.hash = '';
        };
        this.decodeUrlData = function (s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        };
    }
    return UrlHashService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UrlHashService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQUE7UUFBQSxpQkFxQ0M7UUFwQ1UsWUFBTyxHQUFHO1lBQ2IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUssZ0JBQVcsR0FBRztZQUNqQixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7WUFDekMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRXBCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFFSyxjQUFTLEdBQUc7WUFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBRU0sa0JBQWEsR0FBRyxVQUFDLENBQVM7WUFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FyQ0EsQUFxQ0MsSUFBQSIsImZpbGUiOiJ1cmwtaGFzaC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJsSGFzaFNlcnZpY2Uge1xyXG4gICAgcHVibGljIGdldEhhc2ggPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjLycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignIy8nKSArIDIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaC5pbmRleE9mKCcjJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGFzaDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEhhc2hEYXRhID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuZ2V0SGFzaCgpO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlZ2V4ID0gLyhbXiY9XSspPT8oW14mXSopL2c7XHJcbiAgICAgICAgY29uc3QgaGFzaERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzFdKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMl0pO1xyXG5cclxuICAgICAgICAgICAgaGFzaERhdGFbcGFyYW1ldGVyXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBtYXRjaCA9IHNlYXJjaFJlZ2V4LmV4ZWMoaGFzaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGFzaERhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjbGVhckhhc2ggPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVVcmxEYXRhID0gKHM6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcclxuICAgIH07XHJcbn0iXX0=
