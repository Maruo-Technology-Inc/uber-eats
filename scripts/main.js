document.addEventListener("DOMContentLoaded", function () {
    const io = new fadeIn(".main-location");
    const so = new ScrollObeserver(".animation-title");
});

class fadeIn{
    constructor(el){
        this.el = document.querySelector(el);
        this.options = {rootMargin:"-82px 0px 0px 0px"};
        this.io = new IntersectionObserver(this._cb,this.options);
        this.io.observe(this.el);
    }
    _cb(entries){
        const headerLocation = document.querySelector(".header-location");
        entries.forEach(entry => {
            if(entry.isIntersecting){
                headerLocation.classList.remove("inview");
            }else{
                headerLocation.classList.add("inview");
            }
        });
    };
}

class ScrollObeserver{
    constructor(els){
        this.els = document.querySelectorAll(els);
        this.options = {rootMargin:"-150px 0px -50px 0px"};
        this.ioAnimation = new IntersectionObserver(this._callback,this.options);
        this.els.forEach(el => this.ioAnimation.observe(el));
    }
    _callback(entries,observer){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const animation = new TextAnimation(entry.target);
                animation.animate();
                observer.unobserve(entry.target);
            }else{
            }
        })
    };
}

class TextAnimation{
    constructor(el){
        this.el = el instanceof HTMLElement? el: document.querySelector(el);
        this.chars = this.el.innerHTML.trim().split("");
        this.el.innerHTML = this._splitText();
    }
    _splitText(){
        return this.chars.reduce((acc,curr) => {
            curr = curr.replace("/\s+/","&nbsp;");
            return `${acc}<span class="char">${curr}</span>`;
        },"");
    }
    animate(){
        this.el.classList.toggle("inview");
    }
}