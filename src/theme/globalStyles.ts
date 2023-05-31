import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`


* {
    box-sizing: content-box;
    box-sizing: border-box;
}

img {
    max-width: 100%;
}

body  {
    font-family : 'Roboto'
}
html,body ,#root {
    width : 100vw;
    overflow-x : clip;
    min-height : 100svh;
}
`;
