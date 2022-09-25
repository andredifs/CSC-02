async function getData() {
    const month = document.getElementById('month');
    const state = document.getElementById('state');
    const year = (new Date()).getFullYear();

    const params = (new URLSearchParams({
        month: month.value,
        state: state.value,
        year: year
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
    weather.innerHTML = results.weather;
}
