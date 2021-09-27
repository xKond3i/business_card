// greeting
console.log("%cHey!\n" + "%cGood to see You at the backstage.\n" + "%cKonrad Ceglarski", "font-weight: bold;", "", "font-weight: bold; color: #2c4da5;");

// timelinemax
const tl = new TimelineMax();

// animation subjects
const greeting = document.querySelector('#greeting');
const content = document.querySelector('#content');

// have been restarted?
var replaying = false;

// animate on load
window.onload = function() {

  // play
  animate();
  // if not mobile theme don't refresh the theme on resize. :P
  if (!window.matchMedia("only screen and (max-width: 1024px)").matches) { window.addEventListener('resize', animate); }

  // handle storage (theme)
  handleStorage();

  // theme button
  document.querySelector('#themeswitch').addEventListener('click', () => {
    localStorage['theme'] = ((localStorage['theme'] == 'light') ? 'dark' : 'light');
    handleStorage();
  });

  return;

}

// animation
function animate() {

  // restart - clear previous animation if replaying
  if (replaying) {
    tl.clear();
    tl.set(greeting, { x: 0, y: 0 });
    tl.set(content, { margin: 0, width: 'auto', height: 'auto', opacity: 1 });
    tl.set({}, {}, 1);
  }

  if (window.matchMedia("only screen and (max-width: 1024px)").matches) {
    // mobile animtion
    tl.fromTo(greeting, 1, { y: 0 }, { y: window.innerHeight * 3, ease: Power3.easeInOut })
      .set(content, {transformOrigin:"100% 50%"})
      .fromTo(content, 1, { margin: 0, height: 0, opacity: 0 }, { marginTop: 16, height: 'auto', opacity: 1, ease: Power3.easeInOut }, '+=.5');
  
  } else {
    // desktop animation
    tl.fromTo(greeting, 1, { x: 0 }, { x: window.innerWidth * 3, ease: Power3.easeInOut })
      .set(content, {transformOrigin:"50% 0%"})
      .fromTo(content, 1, { margin: 0, width: 0, opacity: 0 }, { marginLeft: 32, width: 'auto', opacity: 1, ease: Power3.easeInOut }, '+=.5');
  
  }

  replaying = true;
  return;

}

// localstorage handling
function handleStorage() {

  // define theme for simplicity
  let theme = localStorage['theme'];

  // set theme if haven't been set
  if (!theme) { localStorage['theme'] = 'light'; }

  // change the mode
  if (theme == 'light') {
    document.querySelector('#wave').classList.remove('active');
    document.documentElement.classList.remove('dark');

  } else if (theme == 'dark') {
    document.querySelector('#wave').classList.add('active');
    document.documentElement.classList.add('dark');

  }

  return;

}