interface ColorMade {
        button: string,
        background: string,
        text:string,
        miniText:string
}

interface Theme {
    lightMode: ColorMade
    darkMode:ColorMade
    primaryBlue: string
    secondaryGreen: string;
    tertiaryRed: string;
    mode?: string;
    fontFamily: string;
}

 const theme: Theme = {
    lightMode: {
        button: "#FFFFFF",
        background: "#F4F6FA",
        text:"#313E51",
        miniText:"#626C7F"
    },

    darkMode: {
        button:"#3B4D66",
        background: '#313E51',
        text:"#FFFFFF",
        miniText:"#ABC1E1"
    },

    primaryBlue: "#A729F5",
    secondaryGreen: "#26D782",
     tertiaryRed: "#EE5454",
     fontFamily: '"Rubik Variable ", "Rubik", sans-serif', 
}

export default theme
