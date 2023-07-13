import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { filterAds, searchFilter } from '../../redux/ads/adsSlice'
import { resetUser } from '../../redux/auth/authSlice'
import profile from '../../images/profile.png'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Avatar } from '@mui/material'
import logo from '../../assets/default.png';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderIcon from '@mui/icons-material/Folder';
import VerifiedIcon from '@mui/icons-material/Verified';


// import appLogo from '../../assets/logo.svg';
// import { Button } from 'react-bootstrap'


const Header = () => {
  const [value, setValue] = useState(null)
  const [input, setInput] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((select) => select.auth)

  useEffect(() => {
    if (value || value !== null) {
      dispatch(filterAds(value.label))
    }
  }, [dispatch, value])

  useEffect(() => {
    dispatch(searchFilter(input))
  }, [dispatch, input])

  const logout = () => {
    localStorage.clear()
    dispatch(resetUser())
    navigate('/')
  }

  const handleSellBtnClick = () => {
    if (!user) {
      toast.error('To post Ad, Please login')
    }
  }

  const handleInboxBtnClick = () => {
    if (!user) {
      toast.error('To check Inbox, Please login')
    }
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Navbar bg="light" expand="lg" style={{ height: '6rem' }}>
      <Container fluid>
        <NavLink to="/">
          <img src={logo} alt="BaichOye logo" width={300} />
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex" style={{ flex: 1 }}>
            <div style={{ width: '50%' }}>
              <GooglePlacesAutocomplete
                selectProps={{
                  value,
                  onChange: setValue,
                }}
                autocompletionRequest={{
                  componentRestrictions: { country: ['pk'] },
                }}
              />
            </div>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user && (
              <NavLink
                className="nav-link ms-2"
                to="/inbox"
                onClick={handleInboxBtnClick}
              >
                Inbox
              </NavLink>
            )}

            <NavLink
              className="nav-link ms-2"
              to="/sell"
              onClick={handleSellBtnClick}
            >
              Sell
            </NavLink>

            {user && (
              <NavLink
                className="nav-link ms-2"
                to="/wallet"
              >
                Wallet
              </NavLink>
            )}

            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <div style={{ marginLeft: '1rem' }}>
                <Avatar
                  alt="Suwaid"
                  src={user.picture ? user.picture : profile}
                  onClick={handleClick}
                  style={{ background: 'none', cursor: 'pointer' }}
                />

                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  // MenuListProps={{
                  //   'aria-labelledby': 'basic-button',
                  // }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  sx={{
                    '.MuiPaper-root': {
                      padding: '1rem',
                    },
                  }}
                  style={
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                    }
                  }
                >
                  <div className="d-flex">
                    <img
                      src={user.picture ? user.picture : profile}
                      width={50}
                      height={50}
                      alt="profile"
                      style={{ borderRadius: '50%' }}
                    />

                    <div className="d-flex flex-column ps-2">
                      <span style={{ fontWeight: 'bold' }}>
                        {user.fullName}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"
                      style={{
                        color: '#333',
                        padding: '6px 0px',
                        textDecoration: 'none',
                      }}
                    >
                      <ListItemIcon>
                        <ManageAccountsIcon fontSize="small" />
                      </ListItemIcon>
                      My Account
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link
                      to="/verify-me"
                      className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"
                      style={{
                        color: '#333',
                        padding: '6px 0px',
                        textDecoration: 'none',
                      }}
                    >
                      <ListItemIcon>
                        <VerifiedIcon fontSize="small" />
                      </ListItemIcon>
                      Verify Me
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link
                      to="/myads"
                      className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"
                      style={{
                        color: '#333',
                        padding: '6px 0px',
                        textDecoration: 'none',
                      }}
                    >
                      <ListItemIcon>
                        <FolderIcon fontSize="small" />
                      </ListItemIcon>
                      My Ads
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default Header;