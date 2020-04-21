function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let inputUrl = document.getElementById('input').value
    let isValid = Client.validateUrl(inputUrl)

    if (isValid) {
        fetch('http://localhost:8080/ask', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: inputUrl})
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById("polarity-result").innerHTML = `${res.polarity} (${res.polarity_confidence})`;
            document.getElementById("subjectivity-result").innerHTML = `${res.subjectivity} (${res.subjectivity_confidence})`;
        })
    }
}

export { handleSubmit }
