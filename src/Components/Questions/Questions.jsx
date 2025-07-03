
import { guessSurah } from "quran-quiz";
import {  useState } from "react";
import toast from "react-hot-toast";
import RadioButtonsGroup from "../RaidoButtons/RadioButtons";

export default function Questions() {
  const [Questions, setQuestions] = useState(null);
  async function getQuestions(arr, numberOfQuestions) {
    const data = await guessSurah.bySurah({
      amount: numberOfQuestions,
      select: arr,
    });
   
    setQuestions(data)
  }
  const arr = Array.from({ length: 20 }, (_, i) => i + 1);
  const [numbersOfQuestions, setnumbersOfQuestions] = useState(0);
  const surahNames = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأعراف",
    "الأنفال",
    "التوبة",
    "يونس",
    "هود",
    "يوسف",
    "الرعد",
    "إبراهيم",
    "الحجر",
    "النحل",
    "الإسراء",
    "الكهف",
    "مريم",
    "طه",
    "الأنبياء",
    "الحج",
    "المؤمنون",
    "النور",
    "الفرقان",
    "الشعراء",
    "النمل",
    "القصص",
    "العنكبوت",
    "الروم",
    "لقمان",
    "السجدة",
    "الأحزاب",
    "سبأ",
    "فاطر",
    "يس",
    "الصافات",
    "ص",
    "الزمر",
    "غافر",
    "فصلت",
    "الشورى",
    "الزخرف",
    "الدخان",
    "الجاثية",
    "الأحقاف",
    "محمد",
    "الفتح",
    "الحجرات",
    "ق",
    "الذاريات",
    "الطور",
    "النجم",
    "القمر",
    "الرحمن",
    "الواقعة",
    "الحديد",
    "المجادلة",
    "الحشر",
    "الممتحنة",
    "الصف",
    "الجمعة",
    "المنافقون",
    "التغابن",
    "الطلاق",
    "التحريم",
    "الملك",
    "القلم",
    "الحاقة",
    "المعارج",
    "نوح",
    "الجن",
    "المزمل",
    "المدثر",
    "القيامة",
    "الإنسان",
    "المرسلات",
    "النبأ",
    "النازعات",
    "عبس",
    "التكوير",
    "الانفطار",
    "المطففين",
    "الانشقاق",
    "البروج",
    "الطارق",
    "الأعلى",
    "الغاشية",
    "الفجر",
    "البلد",
    "الشمس",
    "الليل",
    "الضحى",
    "الشرح",
    "التين",
    "العلق",
    "القدر",
    "البينة",
    "الزلزلة",
    "العاديات",
    "القارعة",
    "التكاثر",
    "العصر",
    "الهمزة",
    "الفيل",
    "قريش",
    "الماعون",
    "الكوثر",
    "الكافرون",
    "النصر",
    "المسد",
    "الإخلاص",
    "الفلق",
    "الناس",
  ];
  const [selected, setSelected] = useState([]);

  const toggleSelect = (value) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };
  const [makeQuiz, setmakeQuiz] = useState(true);
  
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});

  const handleChange = (selectedOption, options, questionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]:selectedOption,
    }))
    console.log(answers);
  };
  const [isFinished, setisFinished] = useState(false);
  const handleFinishExam = () => {
    let score = 0;
    const corrects = {};

    Questions.data.forEach((q, idx) => {
      q.options.forEach((el) => {
        if (el.value === 1) {
          corrects[idx] = el.text; // حفظ الإجابة الصحيحة للسؤال
        }
      });
      q.options.map((el) => {
        if (answers[idx] === el.text && el.value === 1) {
          score += 1;
        }
      });
      setisFinished(true);
      setCorrectAnswers(corrects); // خزّن الإجابات الصحيحة في الـ state
    });

    toast.success(`Your Score: ${score}/${Questions.data.length}`);
   
  };
  
  return (
    <div
      className="py-30  px-4 min-h-[100vh] m-auto   dark:text-white "
      dir="rtl">
      {makeQuiz ? (
        <div>
          <h1 className="mb-4 text-center">قم بعمل امتحان قصير </h1>
          <h2 className="my-2 text-2xl">اختر عدد الاسئلة</h2>
          <select
            onChange={(e) => {
              setnumbersOfQuestions(e.target.value);
              console.log(e.target.value);
            }}
            className="py-2 px-3  w-full border rounded bg-white dark:bg-black  "
            name="questionsSura"
            id="">
            {arr.map((el) => (
              <option className="dark:bg-black p-3" key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <h3 className="text-center my-3 text-3xl">
            أختر السور التي تريد الأسئلة عنها{" "}
          </h3>
          <div className="flex items-center mt-4 p-4 flex-wrap gap-4">
            {surahNames.map((el, index) => {
              const isSelected = selected.includes(el);
              return (
                <label
                  htmlFor={`checkBox-${index}`}
                  key={index}
                  className={`p-3 text-2xl cursor-pointer group  rounded border shadow-2xl  
              transition-all duration-300
               ${
                 isSelected
                   ? "bg-emerald-600 border-emerald-700 text-white"
                   : "dark:bg-gray-950 bg-white"
               }
            `}>
                  <input
                    id={`checkBox-${index}`}
                    className="hidden peer"
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(el)}
                  />
                  <span>{el}</span>
                </label>
              );
            })}
          </div>
          <button
            onClick={() => {
              if (selected.length >= 4 && Number(numbersOfQuestions) > 4) {
                getQuestions(
                  selected.map((name) => surahNames.indexOf(name) + 1),
                  Number(numbersOfQuestions)
                );
                setmakeQuiz(false);
              
              } else {
                toast(" أختر أكثر 4 سور أو أكتر و عدد أسئلة أكتر من 4", {
                  duration: "500",
                  position: "top-center",
                  icon: "❗",
                });
              }
            }}
            className="mt-6 bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white py-2 px-4 rounded">
            ابدأ الامتحان
          </button>
        </div>
      ) : Questions && Questions.data.length > 3 ? (
        <div className=" flex flex-col justify-center items-center dark:text-white">
          <h1 className=" !text-5xl !font-extrabold my-6">الأسئلة</h1>

          {Questions.data.map((q, idx) => (
            <div
              key={idx}
              className={`bg-white w-full dark:bg-gray-950 rounded p-4 my-3 shadow
               
              `}>
              <div className="flex flex-col gap-2">
                <RadioButtonsGroup
                  handleChange={(e) => {
                    handleChange(e.target.value, q.options,idx);
                  }}
                  question={q.question}
                  values={q.options}
                  index={idx}
                  selectedAnswer={answers[idx]}
                  isFinished={isFinished}
                  correctAnswer={correctAnswers[idx]}

                />
              </div>
            </div>
          ))}
            <button
              
              onClick={() => {
                if (isFinished === false) {
                  handleFinishExam();
                 
                
                }
                else {
                  setmakeQuiz(true)
                }
               

              }}
              className="bg-blue-500 cursor-pointer text-white p-2 rounded">
              {isFinished?"امتحن مره اخري":"انهاء الامتحان"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
