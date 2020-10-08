import styled from 'styled-components'
import { basicWhite } from './ColorConstants'

const StandardLayout = styled.div<{ bColor?: string, wrap?: string, top?: string, minWidth?: string }>`
    margin-top: ${props => props.top ? props.top : '50px'};
    display: flex;
    justify-content: center;
    min-width: ${props => props.minWidth ? props.minWidth : null};
    // flex-wrap: ${props => props.wrap ? props.wrap : 'nowrap'};
    background-color: ${ props => props.bColor ? props.bColor : basicWhite};
    @media(max-width: 1290px) {
        flex-direction: ${ props => props.wrap ? props.wrap : null};
        transition: flex - direction 2s east -in -out;
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