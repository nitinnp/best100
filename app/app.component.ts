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
            <li><a target="_blank" href='#'>Top Rated Products</a></li>
            <li><a routerLink="listing/amz-Laptops" >Laptops</a></li> 
            <li><a routerLink="listing/amz-Desktop" >Desktop</a></li> 
            <li><a routerLink="listing/amz-Cell Phones" >Cell Phones</a></li> 
            <li><a routerLink="listing/amz-Televisions" >Televisions</a></li> 
            <li><a routerLink="listing/amz-Camera" >Camera</a></li> 
            <li><a routerLink="listing/amz-Books">Books</a></li>
            <li><a routerLink="listing/amz-VideoGames">Video Games</a></li> 
            <li><a routerLink="listing/amz-Apps"  >Apps</a></li>
            <li><a routerLink="listing/amz-Movies"  >Movies</a></li>
            <li><a routerLink="listing/amz-Songs"  >Songs</a></li>
            <li><a routerLink="listing/amz-Music Videos"  >Music Videos</a></li>
            <li><a routerLink="listing/amz-Audio Books" >Audio Books</a></li> 
    
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