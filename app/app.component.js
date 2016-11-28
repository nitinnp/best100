"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'My App';
        this.subtitle = '(v1)';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Inside app component ngonInit');
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        //console.log('Inside appcomponent ngAfterViewInit');
        var $nav = $('.greedy-nav');
        var $btn = $('.greedy-nav button');
        var $vlinks = $('.greedy-nav .visible-links');
        var $hlinks = $('.greedy-nav .hidden-links');
        var breaks = [];
        $(window).resize(function () {
            updateNav();
        });
        $btn.on('click', function () {
            $hlinks.toggleClass('hidden');
        });
        function updateNav() {
            var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;
            if ($vlinks.width() > availableSpace) {
                breaks.push($vlinks.width());
                $vlinks.children().last().prependTo($hlinks);
                if ($btn.hasClass('hidden')) {
                    $btn.removeClass('hidden');
                }
            }
            else {
                if (availableSpace > breaks[breaks.length - 1]) {
                    $hlinks.children().first().appendTo($vlinks);
                    breaks.pop();
                }
                if (breaks.length < 1) {
                    $btn.addClass('hidden');
                    $hlinks.addClass('hidden');
                }
            }
            $btn.attr('count', breaks.length);
            if ($vlinks.width() > availableSpace) {
                updateNav();
            }
        }
        updateNav();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "\n \n  \n <div class=\"top-bar-container\" data-sticky-container>\n    <div class=\"sticky\" data-sticky data-options=\"anchor: page; marginTop: 0; stickyOn: small;\">\n     <nav class='greedy-nav'>\n        <button><div class=\"hamburger\"></div></button>\n          \n          <ul class='visible-links'>\n            <li><a target=\"_blank\" href='#'>Top Rated Products</a></li>\n            <li><a routerLink=\"listing/amz-Laptops\" >Laptops</a></li> \n            <li><a routerLink=\"listing/amz-Desktop\" >Desktop</a></li> \n            <li><a routerLink=\"listing/amz-Cell Phones\" >Cell Phones</a></li> \n            <li><a routerLink=\"listing/amz-Televisions\" >Televisions</a></li> \n            <li><a routerLink=\"listing/amz-Camera\" >Camera</a></li> \n            <li><a routerLink=\"listing/amz-Books\">Books</a></li>\n            <li><a routerLink=\"listing/amz-VideoGames\">Video Games</a></li> \n            <li><a routerLink=\"listing/amz-Apps\"  >Apps</a></li>\n            <li><a routerLink=\"listing/amz-Movies\"  >Movies</a></li>\n            <li><a routerLink=\"listing/amz-Songs\"  >Songs</a></li>\n            <li><a routerLink=\"listing/amz-Music Videos\"  >Music Videos</a></li>\n            <li><a routerLink=\"listing/amz-Audio Books\" >Audio Books</a></li> \n    \n          </ul>\n          <ul class='hidden-links hidden'></ul>\n     </nav>    \n   </div>\n </div>\n \n    <router-outlet></router-outlet>\n\n  <!--/div--> \n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map