import ColorContext from "../contexts/ColorContext";
import LanguageContext from "../contexts/LanguageContext";

const Button = () => {
    return ( 
        <div>
            <ColorContext.Consumer>
            {(color)=> <button className={`ui button ${color}`}><LanguageContext.Consumer>{(value)=> value === 'english'? 'Submit': 'Voorloggen'}</LanguageContext.Consumer></button>}
            
            </ColorContext.Consumer>
            
        </div>
     );
}
 
export default Button;
