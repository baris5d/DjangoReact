import React from'react';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !=='') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i <cookies.length; i++) {
            var cookie = cookies[i].replace('','');
            if (cookie.substring(0, name.length + 1) === (name +'=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const CSRFToken = () => {
    const csrftoken = getCookie('csrftoken');
    return(
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
    )
};

export default CSRFToken 