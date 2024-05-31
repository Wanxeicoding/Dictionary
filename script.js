function searchWord() {
    const word = document.getElementById('search').value;
    const resultDiv = document.getElementById('result');

    if (word === '') {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    // Fetch definition from a dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                resultDiv.innerHTML = '<p>Word not found. Please try another word.</p>';
                resultDiv.style.display = 'flex';
                resultDiv.style.justifyContent = 'center';
                resultDiv.style.alignItems = 'center';
            } else {
                const definitions = data[0].meanings[0].definitions;
                let definitionsHTML = `
                    <div class="result-container">
                        <div class="result-word">${word}</div>
                `;
                definitions.forEach((definition, index) => {
                    const shortDefinition = truncateDefinition(definition.definition, 100);
                    definitionsHTML += `
                        <div class="definition">
                            <span class="definition-number">${index + 1}.</span>
                            <span class="definition-text">${shortDefinition}</span>
                        </div>
                    `;
                });
                definitionsHTML += '</div>';
                resultDiv.innerHTML = definitionsHTML;
                resultDiv.style.display = 'block'; // Reset to block for definitions
            }
        })
        .catch(error => {
            console.error('Error fetching definition:', error);
            resultDiv.innerHTML = '<p>Error fetching definition. Please try again later.</p>';
            resultDiv.style.display = 'flex';
            resultDiv.style.justifyContent = 'center';
            resultDiv.style.alignItems = 'center';
        });
}

function truncateDefinition(definition, maxLength) {
    if (definition.length > maxLength) {
        return definition.substring(0, maxLength) + '...';
    }
    return definition;
}
