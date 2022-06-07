import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    // const upHandler = ({ key }: KeyboardEvent) => {
    //   if (key === targetKey) {
    //     setKeyPressed(false);
    //   }
    // };

    window.addEventListener('keydown', downHandler);
    // window.addEventListener('keyup', upHandler);

    // cleaning up by returning a function in useEffect
    return () => {
      window.removeEventListener('keydown', downHandler);
      // window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return { keyPressed, setKeyPressed };
};

// Reference: https://blog.whereisthemouse.com/create-a-list-component-with-keyboard-navigation-in-react
