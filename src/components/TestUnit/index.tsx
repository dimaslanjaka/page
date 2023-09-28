import React from 'react';

export function Handler() {
  return (
    <div className="p-2">
      <button onClick={() => console.log('clicked')}>button</button>
    </div>
  );
}
