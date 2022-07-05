import LanguageContext from "../contexts/LanguageContext";

const Field = () => {
    return ( 
        <div className="ui field">
            <label><LanguageContext.Consumer>{(value)=> value === 'english'? 'Name': 'Naam'}</LanguageContext.Consumer></label>
            <input />
        </div>
     );
}
 
export default Field;