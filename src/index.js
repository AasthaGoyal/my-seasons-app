import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
    
    state = {lat: null, errorMessage:''};


    componentDidMount()
    {
        window.navigator.geolocation.getCurrentPosition(
              //a function that gets put on app components automatically 
            position =>this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.Message})
            
        );
    }

    renderContent()
    {
         //conditional rendering
         if(this.state.errorMessage && !this.state.lat)
         {
             return <div> Error: {this.state.errorMessage}</div>
         }
         if(!this.state.errorMessage && this.state.lat)
         {
             return <SeasonDisplay lat={this.state.lat}/>
         }
         
         return <Spinner message="Please accept the location request" />;
    }


    //we try to have not many return statements inside the render method so we create a helper method and put the conditional logic in that
    
    render()
    {
       return(
           <div className = "border red">
               {this.renderContent()}
           </div>
       )

    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
 