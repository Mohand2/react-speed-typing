import React, { useState } from 'react';

function Toggle(props) {
  const [isHidden, setisHidden] = useState(false);

  return (
    <div>
      <button type="submit" onClick={() => setisHidden((isH) => !isH)}>
        toggle
      </button>

      {isHidden ? null : props.children}
    </div>
  );
}

export default Toggle;
