import { useState } from 'react';
import Layout from '@/components/Layout';
import BrutalistCard from '@/components/BrutalistCard';
import BrutalistButton from '@/components/BrutalistButton';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const TestPractice = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'practice'>('live');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const questions = [
    {
      id: 1,
      prompt: 'What is the output of: console.log(typeof NaN)?',
      options: ['number', 'NaN', 'undefined', 'object'],
      correct: 0,
    },
    {
      id: 2,
      prompt: 'Which hook is used to perform side effects in React?',
      options: ['useState', 'useEffect', 'useContext', 'useMemo'],
      correct: 1,
    },
    {
      id: 3,
      prompt: 'What does REST stand for?',
      options: [
        'Remote Execution Service Transfer',
        'Representational State Transfer',
        'Rapid Efficient State Transition',
        'Resource Event Service Transport',
      ],
      correct: 1,
    },
  ];

  const practiceTopics = [
    { id: 1, name: 'JavaScript Fundamentals', count: 150 },
    { id: 2, name: 'React Advanced', count: 120 },
    { id: 3, name: 'System Design', count: 80 },
    { id: 4, name: 'Data Structures', count: 200 },
    { id: 5, name: 'SQL Queries', count: 90 },
    { id: 6, name: 'Algorithms', count: 180 },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    alert('Test submitted! Redirecting to results...');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4">Test & Practice</h1>
          
          <div className="flex gap-0 border-4 border-border w-fit">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-8 py-3 font-bold uppercase ${
                activeTab === 'live'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              Live Test
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-8 py-3 font-bold uppercase border-l-4 border-border ${
                activeTab === 'practice'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              Practice Mode
            </button>
          </div>
        </div>

        {activeTab === 'live' && (
          <div className="space-y-6">
            <BrutalistCard variant={timeRemaining < 300 ? 'error' : 'default'}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock size={32} />
                  <div>
                    <div className="text-sm font-bold uppercase">Time Remaining</div>
                    <div className="text-3xl font-bold">{formatTime(timeRemaining)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold uppercase">Progress</div>
                  <div className="text-3xl font-bold">
                    {currentQuestion + 1}/{questions.length}
                  </div>
                </div>
              </div>
              <div className="mt-4 h-4 bg-secondary border-2 border-border">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </BrutalistCard>

            <BrutalistCard>
              <h2 className="mb-6">Question {currentQuestion + 1}</h2>
              <p className="text-xl font-bold mb-8">{questions[currentQuestion].prompt}</p>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 border-4 text-left font-bold ${
                      selectedAnswer === index
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-secondary text-secondary-foreground border-border hover:border-accent'
                    }`}
                  >
                    <span className="mr-4 text-xl">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8 gap-4">
                <BrutalistButton
                  variant="secondary"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft size={20} className="inline mr-2" />
                  Previous
                </BrutalistButton>

                {currentQuestion === questions.length - 1 ? (
                  <BrutalistButton variant="success" onClick={handleSubmit}>
                    Submit Test
                  </BrutalistButton>
                ) : (
                  <BrutalistButton
                    variant="primary"
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  >
                    Next
                    <ChevronRight size={20} className="inline ml-2" />
                  </BrutalistButton>
                )}
              </div>
            </BrutalistCard>
          </div>
        )}

        {activeTab === 'practice' && (
          <div>
            <h2 className="mb-6">Select Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceTopics.map((topic) => (
                <BrutalistCard key={topic.id} className="hover:border-accent cursor-pointer">
                  <h3 className="mb-3">{topic.name}</h3>
                  <div className="text-4xl font-bold mb-4">{topic.count}</div>
                  <div className="text-sm font-bold uppercase">Questions Available</div>
                  <BrutalistButton variant="accent" size="full" className="mt-4">
                    Start Practice
                  </BrutalistButton>
                </BrutalistCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestPractice;
