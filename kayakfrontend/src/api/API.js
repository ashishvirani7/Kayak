const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const doAdminLogin = (payload) =>
fetch(`${api}/adminLogin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const updateUserInfo = (payload) =>
fetch(`${api}/updateUserInfo`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const updateUserBilling = (payload) =>
fetch(`${api}/updateUserBilling`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteAccount = (payload) =>
fetch(`${api}/deleteAccount`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doSignOut = (payload) =>
fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});
export const addHotelAdmin = (payload) =>
fetch(`${api}/addHotelAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminShowAllHotels = () =>
fetch(`${api}/showHotels`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminShowAllFlights = () =>
fetch(`${api}/showFlights`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const checkSession = () =>
fetch(`${api}/sessioncheck`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminShowAllCars = () =>
fetch(`${api}/showCars`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doHotelSearch = () =>
fetch(`${api}/doHotelSearch`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doFlightSearch = () =>
fetch(`${api}/doFlightSearch`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doCarSearch = () =>
fetch(`${api}/doCarSearch`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

