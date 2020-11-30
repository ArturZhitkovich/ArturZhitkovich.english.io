function randomInteger(max) {
    const min = 0;
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const dictionary = getDictionary();

function shuffle(array) {
   return array.sort(() => Math.random() - 0.5);
}


const app = new Vue({
    el: '#app',
    data: {
        dictionary: [...dictionary],
        question: { ...dictionary[0] },
        answers: [
            { ...dictionary[0] },
            { ...dictionary[3] },
            { ...dictionary[2] },
            { ...dictionary[4] },
        ]
    },
    methods: {
        check: function (id) {
            if (id === this.question.id) {
                this.next();
            }
        },
        next: function () {
            let newDictionary = dictionary.filter(it => it.id !== this.question.id);
            const newQuestion = { ...newDictionary[randomInteger(newDictionary.length - 1)] };
            const newAnswers = [ { ...newQuestion }];

            newDictionary = newDictionary.filter(it => it.id !== newQuestion.id);

            for (let i = 0; i < 3; i++) {
                const tempAnswer = { ...newDictionary[randomInteger(newDictionary.length - 1)] };

                newDictionary = newDictionary.filter(it => it.id !== tempAnswer.id);
                newAnswers.push(tempAnswer);
            }

            this.question = newQuestion;
            this.answers = shuffle(newAnswers);
            this.dictionary = [...dictionary];
        }
    }
})
