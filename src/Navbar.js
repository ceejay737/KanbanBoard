import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';

function Navbar() {
  // Get the grouping and sorting options from localStorage or use default values
  const initialGroupingOption = localStorage.getItem('groupingOption') || 'status';
  const initialSortingOption = localStorage.getItem('sortingOption') || 'priority';

  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [sortingOption, setSortingOption] = useState(initialSortingOption);

  const handleGroupingChange = (event) => {
    const selectedGroupingOption = event.target.value;
    setGroupingOption(selectedGroupingOption);

    // Save the selected grouping option in localStorage
    localStorage.setItem('groupingOption', selectedGroupingOption);
  };

  const handleSortingChange = (event) => {
    const selectedSortingOption = event.target.value;
    setSortingOption(selectedSortingOption);

    // Save the selected sorting option in localStorage
    localStorage.setItem('sortingOption', selectedSortingOption);
  };

  return (
    <div>
      <div className="navbar" style={{ height:'40px',padding: '10px', backgroundColor: '#fff', color: '#333' }}>
        <label htmlFor="groupingSelector" style={{ marginRight: '10px' }}>Grouping:</label>
        <select id="groupingSelector" value={groupingOption} onChange={handleGroupingChange} style={{ padding: '5px', border: 'none', backgroundColor: '#FFF', color: '#333', borderRadius: '5px', fontSize: '14px' }}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label htmlFor="sortingSelector" style={{ marginRight: '10px', marginLeft: '10px' }}>Sorting:</label>
        <select id="sortingSelector" value={sortingOption} onChange={handleSortingChange} style={{ padding: '5px', border: 'none', backgroundColor: '#FFF', color: '#333', borderRadius: '5px', fontSize: '14px' }}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Pass grouping and sorting options to KanbanBoard */}
      <KanbanBoard groupingOption={groupingOption} sortingOption={sortingOption} />
    </div>
  );
}

export default Navbar;

