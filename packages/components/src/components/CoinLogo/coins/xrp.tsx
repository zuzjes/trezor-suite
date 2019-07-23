import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg``;
const Circle = styled.circle``;
const Path = styled.path``;

interface SvgProps {
    width: number;
    height: number;
}

const SvgComponent = (props: SvgProps) => (
    <Svg viewBox="0 0 256 256" {...props}>
        <Circle fill="#23292E" cx="128" cy="128" r="128" />
        <Path
            d="M183.773384,59.5348837 L206.592361,59.5348837 L159.117756,108.776112 C141.933012,126.600856 114.070463,126.600856 96.885421,108.776112 L49.4113373,59.5348837 L72.2298675,59.5348837 L108.294761,96.942214 C119.178556,108.231144 136.824175,108.231144 147.70864,96.942214 L183.773384,59.5348837 Z"
            fill="#FFFFFF"
            fill-rule="nonzero"
        />
        <Path
            d="M71.9348837,196.465265 L49.1162791,196.465265 L96.8836465,146.91974 C114.068688,129.095092 141.931163,129.095092 159.116651,146.91974 L206.883721,196.465265 L184.064744,196.465265 L147.706791,158.753488 C136.822326,147.464409 119.176781,147.464409 108.292986,158.753488 L71.9348837,196.465265 Z"
            fill="#FFFFFF"
            fill-rule="nonzero"
        />
    </Svg>
);

export default SvgComponent;
