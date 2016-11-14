import { Component, AfterViewInit  } from '@angular/core';
declare var jQuery:JQueryStatic;
@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
 
  
 <div class="top-bar-container" data-sticky-container>
    <div class="sticky" data-sticky data-options="anchor: page; marginTop: 0; stickyOn: small;">
     <nav class='greedy-nav'>
        <button><div class="hamburger"></div></button>
          <ul class='visible-links'>
            <li><a routerLink="listing/amz-Electronics-Laptops" >Laptops</a></li> 
            <li><a routerLink="listing/amz-Electronics-Desktops" >Desktop</a></li> 
            <li><a routerLink="listing/topfreeebooks"  >Books</a></li>
            <li><a routerLink="listing/topfreeapplications"  >IOS Apps</a></li>
            <li><a routerLink="listing/topmovies"  >Movies</a></li>
            <li><a routerLink="listing/topsongs"  >Songs</a></li>
            <li><a routerLink="listing/topmusicvideos"  >Music Videos</a></li>
            <li><a routerLink="listing/toptvepisodes"  >TV Episodes</a></li>
            <li><a routerLink="listing/topaudiobooks" >Audio Books</a></li> 
    
          </ul>
          <ul class='hidden-links hidden'></ul>
     </nav>    
   </div>
 </div>
 
    <router-outlet></router-outlet>

  <!--/div--> 

  `
})
export class AppComponent {
    title = 'My App';
    subtitle = '(v1)';



    ngAfterViewInit() {
            console.log('Inside appcomponent ngAfterViewInit');

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
                } else {
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
    }

}