import Chat from '../pages/chat';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Error404 from '../pages/error404';
import Error500 from '../pages/error500';
import Profile from '../pages/profile';
import PasswordProfile from '../pages/profile/password';
import ChangeProfile from '../pages/profile/change';

const routes: Record<
  string,
  typeof Chat |
  typeof SignIn |
  typeof SignUp |
  typeof Error404 |
  typeof Error500 |
  typeof Profile |
  typeof PasswordProfile |
  typeof ChangeProfile
  > = {
    '/': Chat,
    '/signIn': SignIn,
    '/signUp': SignUp,
    '/error404': Error404,
    '/error500': Error500,
    '/profile': Profile,
    '/profile/password': PasswordProfile,
    '/profile/change': ChangeProfile,
  };

export default routes;
