import Wrapper from '../assets/wrappers/ErrorPage';
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';

function Error() {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt='not found' />
            <h3>Page not found</h3>
            <p>Could not find the page you were looking for</p>
            <Link to='/' >Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error