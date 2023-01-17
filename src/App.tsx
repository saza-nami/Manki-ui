import React from 'react';
import Main from 'Main';
import * as Manki from 'api/manki';
import Swal from 'sweetalert2';

export const userIdContext = React.createContext({} as {
  userId: Manki.UserId | undefined;
});

function App() {
  const [phase, setPhase] = React.useState<string>('0');
  const [userId, setUserId] = React.useState<Manki.UserId>();

  async function onLoad() {
    const userId = await Manki.createUser();
    if (userId instanceof Error) {
      Swal.disableButtons();
      Swal.fire({
        titleText: 'ユーザー識別子の発行に失敗しました',
        text: userId.message + '続行するにはリロードしてください。',
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        willClose: () => window.location.reload(),
      });
      return;
    }
    setUserId(userId);
    setPhase('1');
  }

  const didLogRef = React.useRef(false);
  React.useEffect(() => {
    if (!didLogRef.current) {
      didLogRef.current = true;
      onLoad();
    }
  }, []);

  return (
    <userIdContext.Provider value={{userId}}>
      <Main phase={phase} setPhase={setPhase} />
    </userIdContext.Provider>
  );
}

export default App;
