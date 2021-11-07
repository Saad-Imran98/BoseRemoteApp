
export const getVolume = function() {
    const url = "/getVolume";
    const options = {
        'method': 'GET',
    }

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((body) => {
                console.log(body)
                resolve(body.json())
            })
            .catch((error) => reject(error))
    })
}

export const increaseVolume = function() {
    const url = "/increaseVolume";
    const options = {
        'method': 'POST',
    }

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((body) => {
                console.log(body)
                resolve(body.json())
            })
            .catch((error) => reject(error))
    })
}

export const decreaseVolume = function() {
    const url = "/decreaseVolume";

    const options = {
        'method': 'POST',
    }

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((body) => {
                console.log(body)
                resolve(body.json())
            })
            .catch((error) => reject(error))
    })
}
