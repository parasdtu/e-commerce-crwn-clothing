import React from 'react';
import './homepage.styles.scss';
import Directory from  '../../components/directory/directory.component';


class HomePage extends React.Component{ 
    constructor(){
        super();
    }
    
    render(){
        console.log(this.props);
        return(
        <div className='homepage'>
            <Directory />
        </div>
        );
    }
    
}
    


export default HomePage;