import styled from 'styled-components'

// export const HH = styled.div<{ height: string }>` font-size: ${props => props.height}`;
// export const SliderInput = styled.input < {thumpColor?: string}> `

export const SliderInput = styled.input < {thumpColor?: string}> `
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width ${props => props.width};
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(to top, #d3d3d3 , black 96%);

    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
         background: ${props => props.thumpColor ? props.thumpColor : 'black'};
        appearance: none;
        width: 17px;
        height: 18px;
        border-radius: 9.5px;
     }
`;







