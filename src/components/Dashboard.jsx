import { useState, useRef, useEffect } from 'react';
import Answer from './Answers';
import RecentSearch from './RecentSearch';
import { Marquee } from './BackGrid';
import ReviewCard from './GridTile';
import { AuroraText } from './GreetText'

function Dashboard() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState([]);
    const [allChats, setAllChats] = useState(() => JSON.parse(localStorage.getItem('history')) || {});
    const [currentThreadId, setCurrentThreadId] = useState(null);
    const [loader, setLoader] = useState(false);
    const scrollToAns = useRef();
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [showSidebar, setShowSidebar] = useState(true);

    const handleButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.filter(file => !files.some(f => f.name === file.name));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleDelete = (fileName) => {
        setFiles(prev => prev.filter(file => file.name !== fileName));
    };

    const clearChatHistory = () => {
        localStorage.removeItem('history');
        setAllChats({});
        setResult([]);
        setCurrentThreadId(null);
    };

    const tempResult = ['Hey there! I’m VorteX AI, your soon-to-be smart-as-heck chatbot buddy.', 
        'Right now, I’m still cookin’ in dev mode (you can say learning to slay), so the responses you see? Yeahhh, they’re just placeholder vibes.', 
        'Fake it till I make it, amirite? ¯\\_(ツ)_/¯', 
        'But hold tight! Once I’m fully upgraded, I’ll be ready to take over MANKIND!!', 
        '... Just kidding. Or am I? (≧∇≦)', 
        'In all seriousness, once I’m done cooking, I’ll be ready to actually help you out with real,', 
        ' legit answers — not just these “fake-it-till-I-make-it” ones.', 
        'Catch you on the other side of the code!'
    ];

    const reviews = [
        { name: "Code Wizardry", username: "@jack", body: "Write clean code, squash bugs, and build cool stuff", img: "https://avatar.vercel.sh/jack" },
        { name: "Recipe Mastermind", username: "@jill", body: "Cook tasty stuff without burning the kitchen", img: "https://avatar.vercel.sh/jill" },
        { name: "Music Generator", username: "@john", body: "Make beats, write bars, drop hits", img: "https://avatar.vercel.sh/john" },
        { name: "Career Coach", username: "@jane", body: "Nail resumes, crush interviews, get hired", img: "https://avatar.vercel.sh/jane" },
        { name: "Story Crafter", username: "@jenny", body: "Spin tales, write scripts, woo readers", img: "https://avatar.vercel.sh/jenny" },
        { name: "Language Tutor", username: "@james", body: "Speak new tongues without sounding weird", img: "https://avatar.vercel.sh/james" },
        { name: "Travel Planner", username: "@james", body: "Plan perfect trips with smart itineraries and tips.", img: "https://avatar.vercel.sh/james" },
        { name: "Fitness Buddy", username: "@james", body: "Get custom workouts and fitness tips anytime.", img: "https://avatar.vercel.sh/james" },
        { name: "Design Assistant", username: "@james", body: "Inspire your UI, logo, and color ideas fast.", img: "https://avatar.vercel.sh/james" },
        { name: "Daily Motivation", username: "@james", body: "Start your day with quotes and good vibes.", img: "https://avatar.vercel.sh/james" },
    ];

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);

    const askQuestion = async () => {
        if (!prompt && !currentThreadId) return;

        const isNewThread = currentThreadId === null;
        const threadKey = isNewThread ? prompt : currentThreadId;

        if (isNewThread) setCurrentThreadId(threadKey);

        const newEntries = [{ type: "q", text: prompt }, { type: "a", text: [] }];
        const updatedResult = [...result, ...newEntries];
        setResult(updatedResult);

        const updatedChats = {
            ...allChats,
            [threadKey]: [...(allChats[threadKey] || []), ...newEntries],
        };

        localStorage.setItem("history", JSON.stringify(updatedChats));
        setAllChats(updatedChats);
        setPrompt('');
        setLoader(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        let index = 0;
        const interval = setInterval(() => {
            setResult(prev => {
                const updated = [...prev];
                const lastAnswer = updated[updated.length - 1];

                if (lastAnswer?.type === 'a') {
                    const newAnswer = {
                        ...lastAnswer,
                        text: [...lastAnswer.text, tempResult[index]],
                    };

                    return [...updated.slice(0, -1), newAnswer];
                }

                return updated;
            });
            if (scrollToAns) {
                scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
            }
            index++;
            if (index >= tempResult.length) {
                clearInterval(interval);
                setLoader(false);
            }
        }, 150);
    };

    const handleNewChat = () => {
        setResult([]);
        setCurrentThreadId(null);
    };

    const handleThreadSelect = (key) => {
        setCurrentThreadId(key);
        setResult(allChats[key]);
    };

    return (
        <div className={`grid ${showSidebar ? 'grid-cols-5' : 'grid-cols-1'} h-screen text-center`}>
            <button
                onClick={() => setShowSidebar(prev => !prev)}
                className="absolute top-4 left-4 z-10 bg-zinc-700 text-white px-3 py-1 rounded hover:bg-zinc-600"
            >
                {showSidebar ? 'Hide' : 'Show'}
            </button>

            {showSidebar && (
                <RecentSearch
                    history={allChats}
                    onSelect={handleThreadSelect}
                    onNewChat={handleNewChat}
                    onClear={clearChatHistory}
                />
            )}
            <div className={`p-10 flex flex-col h-screen ${showSidebar ? 'col-span-4' : 'col-span-5'}`}>

                {!loader && result.length === 0 && (
                    <>
                        <div className='text-9xl font-bold'>
                            <AuroraText>VorteX AI</AuroraText>
                        </div>

                        <div className="relative flex w-full h-full flex-col items-center justify-center overflow-hidden gap-4">
                            {[firstRow, secondRow].map((row, i) => (
                                <div key={i} className="relative w-full">
                                    <Marquee reverse={i === 1} pauseOnHover className="[--duration:20s]">
                                        {row.map((review) => (<ReviewCard key={review.username} {...review} />))}
                                    </Marquee>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-900 to-transparent"></div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-900 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {loader && (
                    <div className="flex justify-center items-center" role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 align-center"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

                )}

                <div ref={scrollToAns} className='flex-1 overflow-scroll custom-scrollbar hide-scrollbar px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10'>
                    <ul className='text-zinc-100'>
                        {result.map((item, index) => (
                            <li key={index} className={`${item.type === 'q' ? 'text-right bg-zinc-700 ml-auto' : 'text-left bg-zinc-900 mr-auto'} p-2 border-zinc-700 rounded-3xl w-fit my-2`}>
                                {item.type === 'a' ? item.text.map((line, i) => (
                                    <p key={i}><Answer ans={line} index={i} type={item.type} /></p>
                                )) : <Answer ans={item.text} index={index} type={item.type} />}
                            </li>
                        ))}
                    </ul>
                </div>

                {files.length > 0 && (
                    <div className='w-1/2 mx-auto mt-4 mb-4 text-white'>
                        <ul className="space-y-2 text-sm">
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between items-center bg-zinc-700 rounded px-3 py-1">
                                    <span className="truncate">{file.name}</span>
                                    <button onClick={() => handleDelete(file.name)} className="text-red-400 hover:text-red-600">X</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="bg-zinc-800 w-full max-w-2xl p-2 text-white mx-auto rounded-3xl border border-zinc-700 flex flex-wrap items-center gap-2 sm:flex-nowrap sm:py-3 flex-nowrap">

                    <button
                        onClick={handleButtonClick}
                        className="text-white p-2 rounded-full hover:bg-zinc-600 flex-shrink-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                            />
                        </svg>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                        />
                    </button>

                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                        className="flex-1 min-w-0 flex-1 h-10 p-2 rounded-md bg-zinc-700 placeholder:text-zinc-400 outline-none text-sm"
                        placeholder="Ask me anything"
                    />

                    <button
                        onClick={askQuestion}
                        className="p-2 rounded-full hover:bg-zinc-600 flex-shrink-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0010.607 10.607Z"
                            />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
