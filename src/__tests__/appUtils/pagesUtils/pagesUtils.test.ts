import correctAnswer,{currentSubjectData} from "../../../appUtils/pagesUtils/pageUtils";
import { data } from "../../../__mocks__/data";

jest.mock("../../../__mocks__/data", () => ({
  data: {
    quizzes: [
    {
      title: 'HTML',
      questions: new Array(10).fill({ question: 'Sample question?', answer: 'Sample answer' }),
    },
    {
      title: 'CSS',
      questions: new Array(10).fill({ question: 'Sample question?', answer: 'Sample answer' }),
        },
    {
      title: 'JavaScript',
      questions: new Array(10).fill({ question: 'Sample question?', answer: 'Sample answer' }),
    },
    {
      title:  'Accessibility',
      questions: new Array(10).fill({ question: 'Sample question?', answer: 'Sample answer' }),
    },
  ],
  }
}))


describe('test currentSubject function', () => {
    console.log(data);
    
    test('use html to get title HTML', () => {
    expect(currentSubjectData("html")[0].title).toBe("HTML");
  });

  test('use python to get []', () => {
    expect(currentSubjectData("python")).toStrictEqual([]);
  });

  test('use css to get array of lenght 10', () => {
    expect(currentSubjectData("css")[0].questions.length).toBe(10);

  });
});


describe('test correctAnswer function', () => {
          const mockData =  ["html","css","javascript","python"]

    test('use html to get a', () => {
    expect(correctAnswer(mockData,"html")).toBe("a");
  });

  test('use python to get d', () => {
    expect(correctAnswer(mockData,"python")).toBe("d");
  });

  test('use css to get b', () => {
    expect(correctAnswer(mockData,"css")).toBe("b");

  });
});


