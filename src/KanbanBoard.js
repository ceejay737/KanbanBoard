import React, { useState, useEffect } from 'react';

function KanbanBoard({ groupingOption, sortingOption }) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        const usersDict = {};
        data.users.forEach((user) => {
          usersDict[user.id] = user.name;
        });
        setUsers(usersDict);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (!tickets.length || Object.keys(users).length === 0) return;

    // Group and sort tickets based on options
    const grouped = {};
    tickets.forEach((ticket) => {
      const groupKey =
        groupingOption === 'user' && users[ticket.userId] ? users[ticket.userId] : ticket[groupingOption];
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
    });

    const sortedGrouped = {};
    for (const groupKey in grouped) {
      const group = grouped[groupKey];
      sortedGrouped[groupKey] = group.slice().sort((a, b) => {
        if (sortingOption === 'priority') {
          return a.priority - b.priority;
        } else if (sortingOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    setGroupedTickets(sortedGrouped);
  }, [tickets, groupingOption, sortingOption, users]);
  


  const getColumnName = (groupKey) => {
    if (groupingOption === 'user') {
      const commonUserIcon = <img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" height='20px' width='20px' alt="User" />;
    return (
      <span>
        {commonUserIcon} {groupKey}
      </span>
    );
    } else if (groupingOption === 'priority') {
      const priorityIcons = {
        
        3: { name: 'High', icon: <img src="https://cdn-icons-png.flaticon.com/128/1436/1436397.png" height='20px' width='20px' alt="High" /> },
        2: { name: 'Medium', icon: <img src="https://cdn-icons-png.flaticon.com/128/61/61031.png" height='20px' width='20px' alt="Medium" /> },
        1: { name: 'Low', icon: <img src="https://cdn-icons-png.flaticon.com/128/1285/1285128.png" height='20px' width='20px' alt="Low" /> },
        4: { name: 'Urgent', icon: <img src="https://cdn-icons-png.flaticon.com/128/2014/2014901.png" height='20px' width='20px' alt="Urgent" /> },
        0: { name: 'No priority', icon:  <img src="https://cdn-icons-png.flaticon.com/128/1208/1208117.png" height='20px' width='20px' alt="No priority" /> },
      };
      return (
        <span>
          {priorityIcons[groupKey]?.icon} {priorityIcons[groupKey]?.name}
        </span>
      );
    } else if (groupingOption === 'status') {
      const statusIcons = {
        'Todo': <><img src="https://cdn-icons-png.flaticon.com/128/1950/1950715.png" height='20px'width='20px'alt="Todo" /> Todo</>,
        'In progress': <><img src="https://cdn-icons-png.flaticon.com/128/7187/7187174.png" height='20px' width='20px'alt="In Progress" /> In Progress</>,
        'Backlog': <><img src="https://cdn-icons-png.flaticon.com/128/5184/5184609.png" height='20px'width='20px' alt="Backlog" /> Backlog</>,
      };
      return statusIcons[groupKey] || groupKey;
    } else {
      return groupKey;
    }
  };
  
  

  return (
    <div className="kanban-board" style={{ backgroundColor: '#f4f5f8', display: 'flex', gap: '20px', overflowX: 'auto' }}>
      {Object.keys(groupedTickets).map((groupKey) => (
        <div className="column" key={groupKey} style={{ padding: '10px' }}>
          <h3>
            {getColumnName(groupKey)} <span style={{padding:'5px',fontSize:'smaller', color:'#929395'}}>{groupedTickets[groupKey]?.length || 0}</span>
          </h3>
          {groupedTickets[groupKey]?.map((ticket) => (
            <div
              key={ticket.id}
              className="ticket"
              style={{
                width: '325px', 
                backgroundColor: 'white',
                padding: '8px',
                marginBottom: '8px',
                transition: 'background-color 0.3s ease',
                borderRadius: '20px',
              }}
            >
              {users[ticket.userId] && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    marginLeft: '16.5rem',
                    marginRight: 'auto',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                    alt="User Icon"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <p style={{ fontSize: '0.8rem', color: '#374151' }}>{ticket.id}</p>
              <h5 style={{ fontSize: '0.9rem', lineHeight: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#111827' }}>{ticket.title}</h5>
              <p style={{ fontSize: '0.8rem', color: '#374151' }}>{ticket.tag}</p>
            </div>
            
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
