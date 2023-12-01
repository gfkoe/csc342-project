// Check if service workers supported
if('serviceWorker' in navigator) {

    // Register service worker
    navigator.serviceWorker.register('/worker.js')
      .then(reg => {
  
        reg.addEventListener('updatefound', () => {
          
          // A new service worker is installing
          const newWorker = reg.installing;
  
          newWorker.addEventListener('statechange', () => {
            if(newWorker.state === 'installed') {
              
              // Show update ready prompt
              showUpdatePopup();  
  
            } 
          });
  
        });
  
      });
  
  }
  
  function showUpdatePopup() {
  
    // Could show modal popup  
    document.getElementById('update').style.display = 'block';
  
    // Or just console log
    console.log('A new version is available!');
  
  }