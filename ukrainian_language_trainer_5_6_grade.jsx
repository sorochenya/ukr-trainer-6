export default function UkrainianTrainer() {
  const tasks = [
    { question: "До якої частини мови належить слово «швидко»?", options: ["Іменник", "Прикметник", "Прислівник", "Дієслово"], answer: "Прислівник" },
    { question: "До якої частини мови належить слово «малювати»?", options: ["Дієслово", "Іменник", "Числівник", "Займенник"], answer: "Дієслово" },
    { question: "До якої частини мови належить слово «зелений»?", options: ["Прикметник", "Іменник", "Прислівник", "Прийменник"], answer: "Прикметник" },
    { question: "До якої частини мови належить слово «п’ять»?", options: ["Числівник", "Іменник", "Дієслово", "Сполучник"], answer: "Числівник" },
    { question: "До якої частини мови належить слово «книга»?", options: ["Іменник", "Прикметник", "Займенник", "Частка"], answer: "Іменник" },
    { question: "До якої частини мови належить слово «вони»?", options: ["Займенник", "Іменник", "Прислівник", "Вигук"], answer: "Займенник" },
    { question: "До якої частини мови належить слово «над»?", options: ["Прийменник", "Сполучник", "Частка", "Іменник"], answer: "Прийменник" },
    { question: "До якої частини мови належить слово «і»?", options: ["Сполучник", "Прийменник", "Займенник", "Прислівник"], answer: "Сполучник" },
    { question: "До якої частини мови належить слово «дуже»?", options: ["Прислівник", "Прикметник", "Частка", "Іменник"], answer: "Прислівник" },
    { question: "До якої частини мови належить слово «ми»?", options: ["Займенник", "Іменник", "Числівник", "Вигук"], answer: "Займенник" },
  ];

  const shuffled = React.useMemo(() => [...tasks].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [answered, setAnswered] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(300);
  const [finished, setFinished] = React.useState(false);

  const current = shuffled[index];

  React.useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  function check(answer) {
    if (answered || finished) return;

    if (answer === current.answer) {
      setScore((s) => s + 1);
      setMessage("Правильно!");
    } else {
      setMessage(`Неправильно. Правильна відповідь: ${current.answer}`);
    }

    setAnswered(true);
  }

  function nextTask() {
    if (index >= shuffled.length - 1) {
      setFinished(true);
      return;
    }

    setMessage("");
    setAnswered(false);
    setIndex((i) => i + 1);
  }

  function restart() {
    window.location.reload();
  }

  if (finished) {
    return (
      <div className="min-h-screen p-8 bg-white text-gray-900">
        <div className="max-w-xl mx-auto rounded-2xl shadow-md p-6 border">
          <h1 className="text-2xl font-bold mb-4">Результат</h1>
          <p className="mb-4">Ваш результат: {score} із {shuffled.length}</p>
          <button onClick={restart} className="rounded-xl border px-4 py-2">Спробувати ще раз</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-xl mx-auto rounded-2xl shadow-md p-6 border">
        <h1 className="text-2xl font-bold mb-2">Українська мова, 6 клас — Частини мови</h1>
        <p className="mb-1">Бали: {score}</p>
        <p className="mb-4">Час: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>

        <h2 className="text-lg font-semibold mb-3">{current.question}</h2>

        <div className="grid gap-2">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => check(option)}
              className="border rounded-xl p-3 text-left hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>

        {message && <p className="mt-4">{message}</p>}

        <button onClick={nextTask} className="mt-4 rounded-xl border px-4 py-2">
          Наступне завдання
        </button>
      </div>
    </div>
  );
}
