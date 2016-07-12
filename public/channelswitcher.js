var soccerButton = document.getElementById('soccerButton');
var danceButton = document.getElementById('danceButton');
var monitor = document.getElementById('monitor')

soccerButton.addEventListener('click', function() {
    fetch('https://media.giphy.com/media/3o6gEaYbewKku0GwPS/giphy.gif', {
        method: 'GET',
        mode: 'cors',
    }).then(function(response) {
        monitor.src = response.url;
    });
}, false);


danceButton.addEventListener('click', function() {
    fetch('https://media.giphy.com/media/dWavwf9mgTRok/giphy.gif', {
        method: 'GET',
        mode: 'cors',
    }).then(function(response) {
       return response.blob()
    }).then(function(blob){
        var imageObjectURL = URL.createObjectURL(blob);
        monitor.src = imageObjectURL;
    });
}, false);

