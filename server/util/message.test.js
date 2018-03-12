var expect = require('expect');
var {generateMes,generateLocationMes} = require('./message')

describe('generateMes',() => {
    it('should generate correct message object',() => {
        //
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMes(from,text);

    expect(typeof(message.createAt)).toBe('number');
    //expect(message).toInclude({from,text});
    })
})

describe('createLocationMessage',() => {
    it('should generate corrent location',() => {
        var from = 'Jena';
        var latitute = 15;
        var longitute = 19;
        var url = 'https://www.google.com/maps/place/'+latitute+','+longitute;
        var text = 'Some message';
        var message = generateLocationMes(from,latitute,longitute);

        expect(typeof(message.createAt)).toBe('number');
        expect(message).toBe({from,url});
    })
})