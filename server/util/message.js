var generateMes = (from,text) => {
    return{
        from,
        text,
        createAt: new Date().getDay()
    }
}

var generateLocationMes = (from,latitude,longitude) => {
    return{
        from,
        url:'https://www.google.com/maps/place/'+latitude+','+longitude,
        createAt: new Date().getTime()
    };
}

module.exports = {generateMes,generateLocationMes};