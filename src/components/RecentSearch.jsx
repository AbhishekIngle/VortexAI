function RecentSearch({ history, onSelect, onNewChat, onClear }) {
    const promptKeys = Object.keys(history || {});

    return (
        <div className="col-span-1 bg-zinc-800 p-4 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h1 className="text-xl mt-10 text-white">Recent Search</h1>
                <button onClick={onClear} className='text-zinc-400 hover:text-zinc-100 self-center sm:self-auto mt-auto' title="Clear History">
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>

                </button>
            </div>

            <button onClick={onNewChat} className="mb-4 px-3 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-xl">
                + New
            </button>

            <ul className="flex-1 text-left overflow-auto text-xl text-zinc-300">
                {promptKeys.length === 0 && <li className="text-zinc-500">No History</li>}
                {promptKeys.map((key, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(key)}
                        className="pl-2 pr-1 py-1 truncate cursor-pointer hover:bg-zinc-700 hover:text-white rounded"
                        title={key}
                    >
                        {key}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentSearch;
