import React from 'react';

export function BootstrapCheatSheet() {
  React.useEffect(() => {
    //
  });

  return (
    <main>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Right-aligned menu example
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" type="button">
              Action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Another action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
