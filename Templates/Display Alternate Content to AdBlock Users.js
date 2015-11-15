// http://www.labnol.org/internet/alternate-content-for-adblock/28602/

<script> 
  
  // Run after all the page elements have loaded
  window.onload = function(){ 
  
    // This will take care of asynchronous Google ads
    setTimeout(function() { 
      
      // We are targeting the first banner ad of AdSense
      var ad = document.querySelector("ins.adsbygoogle");
      
      // If the ad contains no innerHTML, ad blockers are at work
      if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
        
        // Since ad blocks hide ads using CSS too
        ad.style.cssText = 'display:block !important'; 
        
        // You can put any text, image or even IFRAME tags here
        ad.innerHTML = 'Your custom HTML messages goes here';
      
      }
      
    }, 2000); // The ad blocker check is performed 2 seconds after the page load 
  }; 
  
</script>