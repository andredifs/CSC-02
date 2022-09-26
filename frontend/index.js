async function getData() {
    const year = document.getElementById('year')
    const month = document.getElementById('month');
    const state = document.getElementById('state');

    const params = (new URLSearchParams({
        month: month.value,
        state: state.value,
        year: year.value
    })).toString();

    fetch('/api/data?' + params, {
        method : "GET",
    }).then(res => res.json())
    .then(data => displayResults(data.results));
}

function displayResults(results) {
    const gov = document.getElementById('gov');
    const weather = document.getElementById('weather');

    gov.innerHTML = results.gov;
    weather.innerHTML = (Math.round(100*results.weather)/100).toString()+' °C';
}
