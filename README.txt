BRUNO MACHADO PORTFOLIO

Static website structure:
- index.html
- games.html
- about.html
- cv.html
- contact.html
- style.css
- main.js
- assets/images/
- assets/documents/

TO ADD YOUR PHOTO:
Put the image inside assets/images/ and replace the portrait placeholder with:
<img src="assets/images/your-photo.jpg" alt="Bruno Machado">

TO ADD CV:
Copy your PDF to:
assets/documents/Bruno_Machado_CV.pdf

The Games page filters are functional. The Contact form is currently front-end only and needs a backend or service such as Formspree/EmailJS to actually send email.

Replace placeholder # links for GitHub and email before publishing.

INDIVIDUAL GAME PAGES

New files:
- game-template.html -> reusable master template
- 3D_Adventure_Game.html
- Endless_Runner.html
- 2D_Turn_Based_RPG.html
- Unreal_Prototype.html

TO CREATE A NEW GAME PAGE:
1. Copy game-template.html.
2. Rename it, for example My_New_Game.html.
3. Replace the placeholder values for title, genre, engine, platform, status, development period and role.
4. Add your images and videos inside assets/images/ (and create assets/videos/ if desired).
5. Link the new page from games.html.

IMAGE EXAMPLE:
<img src="assets/images/my-game/screenshot-01.jpg" alt="Gameplay screenshot">

VIDEO EXAMPLE:
<video controls poster="assets/images/my-game/video-thumbnail.jpg">
  <source src="assets/videos/my-game/gameplay.mp4" type="video/mp4">
</video>

The reusable template includes:
- Large hero media area
- Game metadata
- Game Description
- My Contributions
- Gameplay Showcase carousel
- Media Gallery
- Development Process
- Technologies
- Responsive layout
