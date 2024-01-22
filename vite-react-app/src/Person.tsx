import {getData} from './data'

export default function PersonData(){
    type Person = {
        name : string, 
        education : string,
        imageUrl: string,
        size : number,
        theme : {
            color : string, 
            backgroundColor : string,
        }
    };
    const data : Person[]  = getData();
    console.log("the data is ");
    console.log(data);
    
    return (
        <>    
        {
            data.map(item => <div className = "card" style={ item.theme}>
            <h3> {item.name}</h3> 
            <img src= {item.imageUrl} alt = {item.name} height = {item.size} width = {item.size}/>
            <p>  {item.education}</p>
        </div>)
        }
        </>
    )
}