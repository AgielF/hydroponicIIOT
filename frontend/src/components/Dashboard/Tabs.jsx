function Tabs({ arguments_1, arguments_2, arguments_3, arguments_4, activeTab, onTabChange }) {
  const handleTabClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={activeTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          <option value={arguments_1}>{arguments_1}</option>
          <option value={arguments_2}>{arguments_2}</option>
          <option value={arguments_3}>{arguments_3}</option>
          <option value={arguments_4}>{arguments_4}</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {[arguments_1, arguments_2, arguments_3, arguments_4].map((tab) => (
              <a
                key={tab}
                href="#"
                onClick={() => handleTabClick(tab)}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
