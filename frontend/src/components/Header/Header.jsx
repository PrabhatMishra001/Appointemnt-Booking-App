import { useEffect, useRef, useContext, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext.jsx';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/doctors', display: 'Find a Doctor' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    };

    window.addEventListener('scroll', handleStickyHeader);

    return () => {
      window.removeEventListener('scroll', handleStickyHeader);
    };
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show_menu');
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    menuRef.current.classList.remove('show_menu');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (user && user.photo) {
      console.log('User Photo URL:', user.photo);
    }
  }, [user]);

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/*==============logo============*/}
          <div>
            <img src={logo} alt="Logo" className="w-32 md:w-40" />
          </div>

          {/*================menu=============*/}
          <div className='navigation' ref={menuRef}>
            <button className='mobile-menu-close' onClick={closeMenu}>
              <BiX />
            </button>
            <ul className='menu flex items-center gap-4 md:gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index} onClick={closeMenu}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*============nav right==========*/}
          <div className='flex items-center gap-2 md:gap-4'>
            {token && user ? (
              
                <Link to={role === 'doctor' ? '/doctors/profile/me' : '/user/profile/me'}>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                    <img
                      src={user.photo}
                      className='w-full h-full rounded-full object-cover'
                      alt='User Profile'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/35';
                      }}
                    />
                  </figure>
                </Link>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-4 md:px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] text-sm md:text-base'>
                  Login
                </button>
              </Link>
            )}

            <span className='md:hidden cursor-pointer p-2' onClick={toggleMenu}>
              {isMenuOpen ? (
                <BiX className='w-7 h-7' />
              ) : (
                <BiMenu className='w-7 h-7' />
              )}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
