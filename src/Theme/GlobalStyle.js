import {createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`
    *, *::after,*::before{
        box-sizing: border-box;
    }
    body{
        margin: 0;
        padding: 0;
        width: 100vw;
        min-height: 50vh;
    }
`;

export default GlobalStyle;