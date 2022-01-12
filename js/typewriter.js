const Typewriter = function (txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting =false;
}

//Type Method
Typewriter.prototype.type = function() {
    //current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fulltxt = this.words[current];

    // check if deleting

    if (this.isDeleting) {
        //remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    }
    else{
        //add char
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    // insert txt into elemt
    this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`
  
    //init type speed
    let typeSpeed = 150;

    if (this.isDeleting){
        typeSpeed /= 2;
    }

    // if word is complete
    if (!this.isDeleting && this.txt === fulltxt) {
        // make pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;



    }
    setTimeout(() => this.type(), typeSpeed)
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
   
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new Typewriter(txtElement, words, wait);
}
