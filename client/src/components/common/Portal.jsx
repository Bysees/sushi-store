import ReactDOM from 'react-dom';
const portalNode = document.getElementById('portal');

const Portal = ({ children }) => {

  return ReactDOM.createPortal(
    children,
    portalNode
  )
}

export default Portal