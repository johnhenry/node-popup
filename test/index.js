const tape = require('tape');
const {
    alert,
    confirm,
    prompt,
    choose,
    choosedropdown,
    choosemultiple
} = require('../cjs.js');
tape('Sample Test', async ({
                equal,
                deepEqual,
    end,
                plan
            }) => {
    try {
        {
            await alert('This is a test');
        }
        {
            await confirm('Are you ready to start the test?');
        }
        {
            const answer = await choosedropdown('Unit?', '0: Introduction', '1: In The Beginning...');
        }
        {
            const answer = await prompt('What is the answer to the ultimate question?', '0');
            equal('42', answer.trim().toLowerCase(), 'should be "42"');
        }
        {
            const answer = await choose('What is the first letter of the english alphabet?', 'a', 'b', 'c');
            equal('a', answer, 'should be "a"');
        }
        {
            const answer = await choosemultiple('Ninja Turtles?',
                "Leonardo", "Ralphael", "Michaelangelo", "Donatelo", "Splinter");
            deepEqual(["Leonardo", "Ralphael", "Michaelangelo", "Donatelo"], answer, 'should be all except "Splinter"');
        }
    } catch (error) {
        console.log(`Test ended early: ${error.message}`)
    } finally {
        end();
    }
});
