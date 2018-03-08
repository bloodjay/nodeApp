var generateMes = (from,text) => {
    return{
        from,
        text,
        createAt: new Date().getDay()
    }
}

module.exports = {generateMes};