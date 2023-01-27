import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Header({ logged, username, badge }: { logged: boolean, username: string, badge: string }) {
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav>
      <a href="/" className=''>Book store</a>
      {!logged ? (
        <>
          <a href="/login">login</a>
          <a href="/register">create an account</a>
        </>
      ) : (
        <>
          <span>logged as {username}</span>
          <button onClick={() => logout()}>logout</button>
          <a href="/cart">cart -{badge}-</a>
        </>

      )}
      <a href="/profile">profile</a>
    </nav>
  );
};

