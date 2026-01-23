// MessagesPage.jsx
// Single-file React component using Bootstrap CSS.
// Usage:
// 1) Install Bootstrap: npm install bootstrap
// 2) In your app's entry (e.g. index.js) import 'bootstrap/dist/css/bootstrap.min.css';
// 3) Place this file in your components folder and import <MessagesPage /> where needed.

import React, { useState, useRef, useEffect } from 'react';

export default function MessagesPage() {
  const [conversations] = useState([
    { id: 1, name: 'Aditi Sharma', last: 'See you at 6?', time: '2:14 PM', unread: 2 },
    { id: 2, name: 'Rohan Verma', last: 'Sent the files', time: '11:20 AM', unread: 0 },
    { id: 3, name: 'Design Team', last: 'Review the new mockup', time: 'Yesterday', unread: 5 },
    { id: 4, name: 'Mom', last: 'Don\'t forget milk', time: 'Nov 30', unread: 0 },
  ]);

  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState({
    1: [
      { from: 'them', text: 'Hey! Are we still on for today?', time: '2:10 PM' },
      { from: 'me', text: 'Yes — meeting at the cafe in 30 min.', time: '2:12 PM' },
    ],
    2: [{ from: 'them', text: 'Uploaded the draft.', time: '11:18 AM' }],
    3: [{ from: 'them', text: 'Please check the prototype link.', time: 'Yesterday' }],
    4: [{ from: 'them', text: 'Bring umbrella.', time: 'Nov 30' }],
  });

  const [composer, setComposer] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [activeId, messages]);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleSend() {
    if (!composer.trim()) return;
    const newMsg = { from: 'me', text: composer.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setComposer('');
  }

  function renderAvatar(name) {
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    return (
      <div className="avatar rounded-circle d-flex align-items-center justify-content-center text-white me-2" style={{ width: 48, height: 48, background: '#6f42c1' }}>{initials}</div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row shadow-sm rounded" style={{ height: '80vh', overflow: 'hidden' }}>
        {/* Left: Conversations */}
        <div className="col-12 col-md-4 border-end bg-light p-3 overflow-auto" style={{ maxHeight: '80vh' }}>
          <div className="d-flex align-items-center mb-3">
            <h5 className="mb-0">Messages</h5>
            <div className="ms-auto d-flex align-items-center">
              <input className="form-control form-control-sm me-2" placeholder="Search" />
              <button className="btn btn-sm btn-primary">New</button>
            </div>
          </div>

          <div className="list-group">
            {conversations.map(conv => (
              <button
                key={conv.id}
                className={`list-group-item list-group-item-action d-flex align-items-center ${conv.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(conv.id)}
              >
                {renderAvatar(conv.name)}
                <div className="flex-grow-1 text-start">
                  <div className="d-flex align-items-center">
                    <strong className="me-auto">{conv.name}</strong>
                    <small className="text-muted">{conv.time}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="text-truncate" style={{ maxWidth: 180 }}>{conv.last}</small>
                    {conv.unread ? <span className="badge bg-danger rounded-pill ms-2">{conv.unread}</span> : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Chat area */}
        <div className="col-12 col-md-8 p-0 d-flex flex-column" style={{ background: '#fff' }}>
          <div className="p-3 border-bottom d-flex align-items-center">
            <div className="d-flex align-items-center">
              {renderAvatar(conversations.find(c => c.id === activeId).name)}
              <div>
                <div className="fw-bold">{conversations.find(c => c.id === activeId).name}</div>
                <small className="text-muted">Active now</small>
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-outline-secondary" title="Call">📞</button>
              <button className="btn btn-sm btn-outline-secondary" title="More">⋯</button>
            </div>
          </div>

          <div className="flex-grow-1 p-3 overflow-auto" style={{ background: '#f7f7fb' }}>
            <div className="d-flex flex-column gap-3">
              {(messages[activeId] || []).map((m, idx) => (
                <div key={idx} className={`d-flex ${m.from === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-2 rounded-3 shadow-sm message-bubble ${m.from === 'me' ? 'me' : 'them'}`} style={{ maxWidth: '70%' }}>
                    <div className="small text-muted mb-1" style={{ fontSize: '0.7rem' }}>{m.from === 'me' ? 'You' : conversations.find(c => c.id === activeId).name}</div>
                    <div>{m.text}</div>
                    <div className="text-end small text-muted" style={{ fontSize: '0.7rem' }}>{m.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-3 border-top">
            <div className="input-group">
              <button className="btn btn-outline-secondary" type="button">📎</button>
              <input
                value={composer}
                onChange={e => setComposer(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                type="text"
                className="form-control"
                placeholder="Type a message..."
              />
              <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </div>

      {/* Small custom styles */}
      <style jsx>{`
        .avatar { font-weight:600 }
        .message-bubble.me { background: linear-gradient(135deg,#e7f3ff,#d1ecff); border-radius:12px 12px 6px 12px }
        .message-bubble.them { background: #fff; border-radius:12px 12px 12px 6px }
        .message-bubble { padding:12px }
      `}</style>
    </div>
  );
}
