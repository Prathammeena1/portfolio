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




Shery.hoverWithMediaCircle(".project", {
    images: ['./img/ames.png','./img/Neverland - Brave 13-12-2023 12.36.06 PM.png','./img/Mini Whatsapp - Brave 06-03-2024 3.42.49 PM.png']
});

Shery.makeMagnet(".viewProject" /* Element to target.*/, {
    duration: .1,
});
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
    scale:100,
    width:"550%"
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
