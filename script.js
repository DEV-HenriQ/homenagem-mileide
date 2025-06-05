document.addEventListener('DOMContentLoaded', () => {
   const initialScreen = document.querySelector('.initial-screen');
   const clickToStart = document.querySelector('.click-to-start');
   const carouselContainer = document.querySelector('.carousel-container');
   const music = document.getElementById('background-music');
   const slides = document.querySelectorAll('.carousel-slides .item');
   let currentSlide = 0;
   let carouselInterval;

   // Duração customizada para cada slide (em milissegundos)
   const customDurations = {
       'img/img-1.jpg': 5000, 
       'img/img-2.jpg': 5000,
       'img/img-3.jpg': 5000,
       'img/img-4.jpg': 5000,
       'img/img-5.jpg': 5000,
       'img/img-6.jpg': 5000,
       'img/img-7.jpg': 5000,
       'img/img-8.jpg': 5000,
       'img/img-9.jpg': 5000,
       'vid/vid-1.mp4': 22000, 
       'vid/vid-2.mp4': 18000  
   };

   // Função para mostrar um slide específico
   function showSlide(index) {
       clearInterval(carouselInterval); 

       slides.forEach(slide => {
           slide.classList.remove('active');
           const video = slide.querySelector('video');
           if (video) {
               video.pause();
               video.currentTime = 0; 
           }
       });

       const activeSlide = slides[index];
       activeSlide.classList.add('active');

       let mediaPath = activeSlide.querySelector('img, video').getAttribute('src');
       if (mediaPath.startsWith('./')) {
           mediaPath = mediaPath.substring(2);
       }

       const videoElement = activeSlide.querySelector('video');

       // Lógica para ajustar o volume da música de fundo
       if (videoElement) {
           // Se o slide for um vídeo, diminui o volume da música de fundo para 40%
           music.volume = 0.32; 
           videoElement.muted = false; // Garante que o vídeo não está mutado
           videoElement.play().catch(error => {
               console.log("Erro ao tentar reproduzir vídeo: " + error);
           });
       } else {
           // Se o slide for uma imagem, volta o volume da música de fundo para 100%
           music.volume = .7; 
       }

       const duration = customDurations[mediaPath] || 5000;
       carouselInterval = setInterval(nextSlide, duration);
   }

   function nextSlide() {
       currentSlide++;
       if (currentSlide >= slides.length) {
           currentSlide = 0; 
       }
       showSlide(currentSlide);
   }

   clickToStart.addEventListener('click', () => {
       initialScreen.classList.add('fade-out');
       
       initialScreen.addEventListener('transitionend', () => {
           initialScreen.style.display = 'none';

           carouselContainer.classList.add('active');
           
           music.muted = false; 
           music.play().catch(error => {
               console.log("Erro ao tentar reproduzir música: " + error);
           });

           // Inicia o carrossel e ajusta o volume inicial da música
           showSlide(currentSlide); 
       }, { once: true });
   });
});