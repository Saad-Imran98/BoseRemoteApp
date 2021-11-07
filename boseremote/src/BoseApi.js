
export const getVolume = function() {
    const url = "http://localhost:2023/getVolume";
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
    const url = "http://localhost:2023/increaseVolume";
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
    const url = "http://localhost:2023/decreaseVolume";

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
