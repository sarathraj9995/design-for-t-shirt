// Get HTML elements
const uploadInput = document.getElementById('upload');
const designImage = document.getElementById('design');
const tshirtImage = document.getElementById('tshirt');
const downloadBtn = document.getElementById('download-btn');
const canvas = document.getElementById('canvas');

// Handle file upload and display design on t-shirt
uploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      designImage.src = e.target.result;
      designImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Download t-shirt design as image
downloadBtn.addEventListener('click', function() {
  // Set canvas size same as t-shirt container
  const canvasWidth = tshirtImage.clientWidth;
  const canvasHeight = tshirtImage.clientHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Draw t-shirt image
  const tshirt = new Image();
  tshirt.src = tshirtImage.src;
  tshirt.onload = function() {
    ctx.drawImage(tshirt, 0, 0, canvasWidth, canvasHeight);
    
    // Draw the design on t-shirt
    const design = new Image();
    design.src = designImage.src;
    design.onload = function() {
      const designWidth = designImage.clientWidth;
      const designHeight = designImage.clientHeight;
      const designX = designImage.offsetLeft;
      const designY = designImage.offsetTop;
      ctx.drawImage(design, designX, designY, designWidth, designHeight);
      
      // Trigger download
      const link = document.createElement('a');
      link.download = 'tshirt-design.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };
});
