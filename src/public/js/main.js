window.onload = function() {
    initButtonClick('screen-on-btn', '/screen/on');
    initButtonClick('screen-off-btn', '/screen/off');
}

function initButtonClick(id, targetUrl, body) {
    const button = document.getElementById(id);

    button.addEventListener('click', async _ => {
        try {
            const response = await fetch(targetUrl, {
                method: 'post',
                body: body
            });

            if(response) {
                if(response.delay) {
                    button.disabled = true;
                    setTimeout(() => {
                        button.disabled = false;
                    }, response.delay);
                }
            }
        } catch(err) {
            console.error(`Error: ${err}`);
        }
    });
}


