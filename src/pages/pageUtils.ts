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
    return data.quizzes.filter((quize) => quize.title.toLowerCase() == subject?.toLowerCase());
}

// This function handles input events in the various pages
export function handleInputs (event: React.FormEvent<HTMLInputElement>,isMobile:boolean,handleKeyDown:(event: React.KeyboardEvent,focusableElements?: number)=>any){
    const input = event.currentTarget;
    const value = input.value;
    const key = value.slice(-1); // Get the last character entered
    if (!isMobile) return (input.value = "");

    if (key) {
      const simulatedEvent = new KeyboardEvent("keydown", { key });
      handleKeyDown(simulatedEvent as any);
    }

    input.value = ""; // Clear the input value to capture each keystroke separately
};
  

// Function that prevent the Tab key default action on mobile devices
export function handleMobileKeyDown(event: React.KeyboardEvent) {
      if (event.key === "Tab") {
        return event.preventDefault();
      }
      return;
  }

export default correctAnswer;
