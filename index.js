const firebaseConfig = {
    apiKey: "AIzaSyBaWutMZ_Df05WHLgAbWXX_W8BNg8OLRg0",
    authDomain: "nurram-projects.firebaseapp.com",
    databaseURL: "https://nurram-projects-default-rtdb.firebaseio.com",
    projectId: "nurram-projects",
    storageBucket: "nurram-projects.appspot.com",
    messagingSenderId: "67835346400",
    appId: "1:67835346400:web:0b59be15e9d59d73a5ff85",
    measurementId: "G-T6CNGSRKR5"
};

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.onload = () => {
    let destination = getParameterByName('untuk');;

    if (destination === '' || destination === null) {
        destination = 'Guest'
    }

    const destinedFor = document.getElementById('headerText');
    destinedFor.textContent = `Dear ${destination},`;

    const popUp = document.getElementById('popUp');
    const audio = document.getElementById('audio');

    const waitText = document.getElementById('waitText');
    waitText.style.display = 'none';
    waitText.style.marginTop = '1rem';

    const openBtn = document.getElementById('openBtn');
    openBtn.style.display = 'inline-block';
    openBtn.addEventListener('click', () => {
        popUp.removeAttribute('data-aos')
        popUp.classList.remove('fadeInDown');
        audio.play();

        document.getElementById('wrapper').style.display = 'block';
        AOS.init();
        popUp.style.display = 'none';
        document.body.style.overflowY = 'auto';
    });

    const openMapBtn = document.getElementById('openMap');
    openMapBtn.addEventListener('click', () => {
        window.open('https://www.google.com/maps/place/Institut+Agama+Islam+Cipasung/@-7.3496343,108.127125,15z/data=!4m5!3m4!1s0x0:0x9eb404166b256d11!8m2!3d-7.3496343!4d108.127125',
            '_blank').focus();
    })

    const addToMapBtn = document.getElementById('addToCalendarBtn');
    addToMapBtn.addEventListener('click', () => {
        var text = 'Silvy and Febiana Wedding';
        var date = '21082021'
        var location = 'Institut Agama Islam Cipasung'
        var googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${text}&dates=${date}/${date}&location=${location}`;
        window.open(googleCalendarUrl).focus();
    });
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        if (name === '' || comment === '' || name.length < 3) {
            return;
        } else {
            await postComment(name, comment);
            location.reload();
        }
    })
}

postComment = async (name, comment) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date();
    const datetime = date.getMilliseconds();
    const dateString = date.toLocaleString("id-ID", options);

    await ref.child(`${name.slice(0, 3)}${datetime}`).set({
        name: name,
        comment: comment,
        date: dateString
    });
}