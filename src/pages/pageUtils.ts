import data from '../../public/data.json' 

type OptionsType = string[]
type AnswerTpe = string

function correctAnswer(options: OptionsType, answer: AnswerTpe):string {
    for (let i = 0; i < 4; i++){
            if(options[i] == answer) return `${i == 0 ? "a" : i == 1 ? "b" : i == 2 ? "c" : "d"}`
    }
    return ""
}


export function currentSubjectData(subject?:string) {
    return data.quizzes.filter((quize)=>quize.title == subject)
}


export default correctAnswer
