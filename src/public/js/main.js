let actionsTable;

window.onload = function() {
    actionsTable = document.getElementById('screen-actions');
    initButtonClick('screen-on-btn', '/screen/on');
    initButtonClick('screen-off-btn', '/screen/off');
}

function initButtonClick(id, targetUrl, body) {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        fetch(targetUrl, {
            method: 'post',
            body: body
        })
            .then(response => response.json())
            .then(data => {
                if(data) {
                    if(data.delay) {
                        setTableDisabled(actionsTable, true);
                        setTimeout(() => {
                            setTableDisabled(actionsTable,false);
                        }, data.delay);
                    }
                }
            });
    });
}

function setTableDisabled(tableEl, disabled) {
    for (let item of tableEl.getElementsByTagName('table')[0].getElementsByTagName('button')) {
        item.disabled = disabled;
    }
    tableEl.getElementsByClassName('status')[0].style.display = disabled ? "block" : "none";
}


