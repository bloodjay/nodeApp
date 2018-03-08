var expect = require('expect');
var {generateMes} = require('./message')

describe('generateMes',() => {
    it('should generate correct message object',() => {
        //
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMes(from,text);

    expect(typeof(message.createAt)).toBe('number');

    })
})