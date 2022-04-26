const qs = [' should', ' shall', ' would', ' will', ' could', ' can', ' do', ' did', ' was', ' were', ' is', ' are', ' am'];
const ws = [' who', ' what', ' when', ' where', ' why', ' how'];

module.exports = {
    name: 'readMessage',
    description: 'checks the supplied message for keywords and returns a response',
    execute(content) {

        var responses = [];

        if (content.includes('you travis')) {
            const parts = content.split('you travis');

            responses.push(parts[0] + 'you too :)');
        }
        else if (content.startsWith('travis no')) {
            responses.push('travis yes!');
        }
        else if (content.includes(' heck') || content.startsWith('heck')) {
            const parts = content.split('heck');
            const trim = parts[1].replace(/\'/g, '').replace(/ i /g, ' you ').replace(/ im /g, ' youre ')
            responses.push('heck' + trim + '!!');
        }
        //hey travis questions
        else if (content.includes('hey travis')) {

            var yn = false;
            var hasW = false;
            for (var i = 0; i < qs.length; i++) {
                if (content.includes(qs[i])) yn = true;
                if (content.includes(ws[i])) hasW = true;
            }

            if (content.includes(' or ')) {

                if (!yn) {
                    const trim = content.slice(11).replace(/,/g, '').replace('?', '');
                    const choices = trim.split(/ +/);

                    var selection = Math.floor(Math.random() * choices.length);
                    if (selection === choices.length) selection -= 1;

                    const hesitate = Math.floor(Math.random() * 4);
                    if (hesitate > 1) {
                        responses.push('hmmm');
                    }
                    if (hesitate > 2) {
                        responses.push('this is a tough one');
                    }
                    responses.push(choices[selection] + '!');
                }
                else {
                    const choices = content.trim(11).replace(' or ', ',').split(',');

                    var selection = Math.floor(Math.random() * choices.length);
                    if (selection === choices.length) selection -= 1;

                    responses.push('i like option ' + (selection + 1) + '!');
                }

            }
            else if (content.includes(' roll ')) {

                const die = content.split('roll a ')[1].split()[0];
                var roll;

                if (die === 'die') {
                    roll = Math.ceil(Math.random() * 20);
                }
                else {
                    const max = parseInt(die.substr(1));
                    roll = Math.ceil(Math.random() * max);
                }
                responses.push(roll + '!');
                return responses;
            }
            else if (hasW)
                responses.push('sounds like a u question');
            else if (yn) {
                if (Math.random() <= 0.5) responses[0] = 'yes!';
                else responses.push('no!');
            }

            else responses.push('wot');
        }
        return responses;
    }
}