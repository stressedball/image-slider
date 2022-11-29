'use strict';

window.addEventListener('load', onLoad);
let magicSwitch = false;
let retrograde = false;

function onLoad() {
    displayImg();
    const arrows = document.querySelectorAll('.arrow');
    for (let arrow of arrows) {
        arrow.addEventListener('click', changePhoto);
    }
}

function changePhoto(e) {
    if (e.target.alt === 'arrow-right') {
        magicSwitch = true;
        autoSlide();
    } else if (e.target.alt === 'arrow-left') {
        magicSwitch = true;
        retrograde = true;
        autoSlide();
    }
}

function displayImg() {
    const collection = document.querySelectorAll('.image');
    const dots = document.querySelectorAll('.dot-container');
    for (let i = 0; i < collection.length; i++) {
        collection[i].setAttribute('data-index', i);
        collection[i].classList.add('hidden');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].setAttribute('data-index', i);
    }
    const random = Math.trunc(Math.random() * 10);
    document.querySelector(`.image[data-index = "${random}"`).classList.remove('hidden');
    document.querySelector(`.image[data-index = "${random}"`).classList.add('displayed');
    document.querySelector(`.dot-container[data-index = "${random}"]`).classList.add('dot-pointer');
    autoSlide();
}


function autoSlide() {

    const imageSelect = document.querySelector('.image.displayed');
    const imagePointer = Number(imageSelect.dataset.index);
    let nextImage = document.querySelector(`.image[data-index = '${imagePointer + 1}']`);

    const dot = document.querySelector('.dot-pointer');
    const dotIndex = Number(dot.dataset.index);
    let nextDot = document.querySelector(`.dot-container[data-index = '${dotIndex + 1}']`);

    if (imagePointer === 9) {
        nextImage = document.querySelector(".image[data-index = '0']");
    }

    if (dotIndex === 9) {
        nextDot = document.querySelector(".dot-container[data-index = '0']");
    }

    if (retrograde === true) {
        if (imagePointer === 0) {
            nextImage = document.querySelector(`.image[data-index = '9']`);
        } else {
            nextImage = document.querySelector(`.image[data-index = '${imagePointer - 1}']`);
        }
        
        if (dotIndex === 0) {
            nextDot = document.querySelector(".dot-container[data-index = '9']");
        } else {
            nextDot = document.querySelector(`.dot-container[data-index = '${dotIndex - 1}']`);
        }
        retrograde = false;
    }



    imageSelect.classList.remove('displayed');
    imageSelect.classList.add('hidden');
    nextImage.classList.remove('hidden');
    nextImage.classList.add('displayed');

    dot.classList.remove('dot-pointer');
    nextDot.classList.add('dot-pointer');

    if (magicSwitch === true) {
        magicSwitch = false;
        return;
    }

    setTimeout(() => {
        autoSlide();
    }, 2500);
}