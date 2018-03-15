var moment = require('moment');

var generateMes = (from,text) => {
    return{
        from,
        text,
        createAt: moment().valueOf()
    }
}

var generateLocationMes = (from,latitude,longitude) => {
    return{
        from,
        url:'https://www.google.com/maps/place/'+latitude+','+longitude,
        createAt: moment().valueOf()
    };
}

module.exports = {generateMes,generateLocationMes};