var locoScroll;

function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco();


var page1TL = gsap.timeline({
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page1",
        start:"top 0%",
        end:"top -50%",
        scrub:1,
        pin:true,
    }
});

page1TL.to('#nav ,#heroText2',{
    opacity:0,
},'anime1')
.to('#heroText h1',{
    scale:150,
    width:"980%"
},'anime1')
.to("#page1",{
    backgroundColor:'#141414'
},'anime1')
.to('#page1',{
    zIndex:-10
})
.to('#page2',{
    opacity:1,
},)



var page2TL = gsap.timeline({
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page2",
        start:"top 0%",
        end:"top -50%",
        scrub:1,
        pin:true,
    }
});


page2TL
.to('#page2 #card2,#card3,#card4,#card5,#card6,#card7',{
    top:'-8vw',
})
.to('#page2 #card3,#card4,#card5,#card6,#card7',{
    top:'-16vw',
})
.to('#page2 #card4,#card5,#card6,#card7',{
    top:'-24vw',
})
.to('#page2 #card5,#card6,#card7',{
    top:'-32vw',
})
.to('#page2 #card6,#card7',{
    top:'-40vw',
})
.to('#page2 #card7',{
    top:'-48vw',
})




document.querySelector('#letsTalkBtn').addEventListener('click',function(){
    gsap.to('#letsTalkSection',{
        top:0,
        onComplete:function(){
            locoScroll.stop()
            document.querySelector('.c-scrollbar').style.display='none'
        }
    })
})


document.querySelector('.close').addEventListener('click',function(){
    gsap.to('#letsTalkSection',{
        top:'-100vh',
        onComplete:function(){
            locoScroll.start()
            document.querySelector('.c-scrollbar').style.display='initial'
        }
    })
})




function Issues(){
    var oldPosition;
var newPosition;
var isMouseInside = false;

function selectNearestValue(min, middle, max, value) {
  const values = [min, middle, max];
  values.sort((a, b) => a - b);
  let nearestValue = values[0];
  let minDiff = Math.abs(value - values[0]);

  for (let i = 1; i < values.length; i++) {
    const diff = Math.abs(value - values[i]);
    if (diff < minDiff) {
      minDiff = diff;
      nearestValue = values[i];
    }
  }
  return nearestValue;
}

document.querySelectorAll(".overlay").forEach((e) => {
  const issueElem = e.querySelector(".imgBg");
  issueElem.style.pointerEvents = "none"; // Disable pointer events on the image

  e.addEventListener("mouseenter", () => {
    isMouseInside = true;
  });

  e.addEventListener("mousemove", (dets) => {
    if (isMouseInside) {
      newPosition = dets.clientX - e.getBoundingClientRect().left;
      if (!oldPosition) {
        oldPosition = newPosition;
      }

      let differnce = newPosition - oldPosition;
      const rotate = gsap.utils.clamp(-10, 10, differnce);
      var scale = Math.abs(selectNearestValue(-1.5, 1.5, 1.5, rotate));


      gsap.to(`#${e.id} .imgBg`, {
        opacity: 1,
        scale: scale,
        rotate: `${-rotate}deg`,
        ease: "back.out",
        duration: 0.8,
        left: dets.clientX - e.getBoundingClientRect().left + "px",
        top: dets.clientY - e.getBoundingClientRect().top + "px",
      });

      setTimeout(() => {
        oldPosition = dets.clientX - e.getBoundingClientRect().left;
      }, 30);
    }
  }, true);

  e.addEventListener("mouseleave", (dets) => {
    isMouseInside = false;
    gsap.to(`#${e.id} .imgBg`, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
    });
  });
});

}

Issues()