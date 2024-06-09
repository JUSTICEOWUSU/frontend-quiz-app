// importing the appData
import data from  "../DATA/data.json" 

type AnswerTpe = string;
type OptionsType = string[];

// This function takes in an optional choices of 4 and return the correct alphabet base on the provided answer
function correctAnswer(options: OptionsType, answer: AnswerTpe):string {
    for (let i = 0; i < 4; i++){
            if(options[i] == answer) return `${i == 0 ? "a" : i == 1 ? "b" : i == 2 ? "c" : "d"}`
    }
    return ""
}

// This function return the data of a provided subject / topic
export function currentSubjectData(subject?:string) {
    return data.quizzes.filter((quize) => quize.title == subject);
}

export default correctAnswer;
