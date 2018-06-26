
import transition from './NavbarTransition.css';


export default (theme) => ({
  navBar: {
    width: '100%',
    position: 'sticky',
    bottom: 0
  },
  ...transition(theme)
});
