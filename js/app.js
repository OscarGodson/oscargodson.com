/**
 * Core module that looks for and replaces <require> tags with the proper HTML and also takes mustache templates
 * use data-* attributes on the <require> tag for mustache templates
 * 
 * Will push a "required" pub for you to listen for which will contain the element replaced and the HTML
 */
Core.extend('require',function(){
  $('require').each(function(i){
    var $this = $(this);
    $.get($this.attr('src')+'?'+new Date().getTime(),function(data){
      var html = Mustache.render(data,$this.get(0).dataset);
      var replacement = $this.replaceWith(html);
      //Core.push('required',{element:replacement,html:html});
      Core.load('require');
    });
  });
},true).load('require');

/**
 * Colors code on the page
 */
Core.extend('codelorize',function(){
  $('pre').each(function(i,e){
    hljs.highlightBlock(e,'  ');
  });
  //Core.push('codelorized');
},true).load('codelorize');


//Should be in a module soon
$.get('/',function(data){
  $('.from-here li',data).each(function(i){
    if(i == 5){ return false; }
    $('#og-recent-posts ol').append($(this)).find('img').remove();
  });
});


 /**
  * Because i suck:
  * these are aliases that will forward old article hash-bang URLs to my new URLs
  * Delete once incoming links using the old URL pattern cease or get to a very low %
  */
  (function(){
    if(window.location.href.indexOf('#!/') > 0){
      var oldId = window.location.href.split('/')[5]
      ,   forwards = {
            83285686:'/posts/online-privacy-is-a-myth.html',
            66730159:'/posts/unmasking-jsonp.html',
            55075016:'/posts/writing-eloquent-javascript-without-coffeescript.html',
            58912483:'/posts/5-terminal-shortcuts-you-wish-you-knew-years-ago.html',
            61720793:'/posts/spotify-vs-rdio.html',
            60168727:'/posts/google+-vs-twitter-vs-facebook.html',
            59577754:'/posts/dont-be-a-hero-let-me-pick-my-own-fucking-password.html',
            57943522:'/posts/making-vimeo-videos-bigger-than-500px-on-tumblr.html',
            54543724:'/posts/new-file-in-right-click-context-menu-for-mac.html',
            51067522:'/posts/dear-paul-rouget-ie9-is-a-modern-browser.html',
            48906955:'/posts/dont-reinvent-the-wheel.html',
            39445734:'/posts/the-apple-of-my-eye.html',
            36698908:'/posts/why-localstorage-has-already-failed-us.html'
         };
      window.location = forwards[oldId];
    }
  })();