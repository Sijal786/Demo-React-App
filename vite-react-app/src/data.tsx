export function getData(){
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
    
    let person : Person[] = [{
        name : "sijal",
        education : "Computer Science",
        imageUrl : "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png", 
        size : 100,
        theme : {
            color : "black", 
            backgroundColor : "white",
        },
    }, 
    {
        name : "malaika",
        education : "Computer Science",
        imageUrl : "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png", 
        size : 100,
        theme : {
            color : "black", 
            backgroundColor : "white",
        },
    },
    {
        name : "hafsa",
        education : "Computer Science",
        imageUrl : "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png", 
        size : 100,
        theme : {
            color : "black", 
            backgroundColor : "white",
        },
    },
    {
        name : "Raha",
        education : "Computer Science",
        imageUrl : "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png", 
        size : 100,
        theme : {
            color : "black", 
            backgroundColor : "white",
        },
    }]
    
    return person;
}