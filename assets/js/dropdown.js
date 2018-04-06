let x = document.getElementsByClassName("dropdown");
let i;
for (i = 0; i < x.length; i++) {
    x[i].addEventListener('click', function () {
        let container = document.getElementById(this.dataset.container);
        container.classList.toggle('active');
    });
}