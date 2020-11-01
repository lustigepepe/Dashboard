import styled from 'styled-components'
import { basicWhite } from './StyleConstants'

const StandardLayout = styled.div<{ bColor?: string, direction?: string, top?: string, minWidth?: string }>`
    margin-top: ${props => props.top ? props.top : '50px'};
    display: flex;
    justify-content: center;
    min-width: ${props => props.minWidth ? props.minWidth : null};
    // flex-wrap: ${props => props.direction ? props.direction : 'nowrap'};
    background-color: ${ props => props.bColor ? props.bColor : basicWhite};
    @media(max-width: 1290px) {
        flex-direction: ${ props => props.direction ? props.direction : null};
        // flex-direction: ${ props => props.direction ? 'column' : null};
        align-items: center;
        transition: flex-direction 2s east-in-out;
    }

`;
const VerticalLayout = styled.div<{ bColor?: string, margin?: string, padding?: string, shadow?: string, justify?: string }>`
    display: flex;
    justify-content: ${ props => props.justify ? props.justify : 'center'};
    flex-flow: column nowrap;
    padding: ${ props => props.padding ? props.padding : '0 0'};
    margin: ${ props => props.margin ? props.margin : '0 0'};
    background-color: ${ props => props.bColor ? props.bColor : basicWhite};
    box-shadow: ${ props => props.shadow ? props.shadow : '0 0'};
`;


export { StandardLayout, VerticalLayout };