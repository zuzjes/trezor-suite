import { keyframes } from 'styled-components';
import { getColors } from 'config/colors';

const colors = getColors();

export const ROTATE_180_UP = keyframes`
    from { 
        transform: rotate(0deg) 
    }
    to { 
        transform: rotate(180deg) 
    }
`;

export const ROTATE_180_DOWN = keyframes`
    from { 
        transform: rotate(180deg) 
    }
    to { 
        transform: rotate(0deg) 
    }
`;

export const DASH = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
    }
`;

export const SUCCESS_COLOR = keyframes`
    100%, 0% {
        stroke: ${colors.SUCCESS_PRIMARY};
    }
    40% {
        stroke: ${colors.SUCCESS_PRIMARY};
    }
    66% {
        stroke: ${colors.SUCCESS_SECONDARY};
    }
    80%, 90% {
        stroke: ${colors.SUCCESS_SECONDARY};
    }
`;

export const WHITE_COLOR = keyframes`
    0%, 100% {
        stroke: white;
    }
`;

export const PULSATE = keyframes`
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1.0;
    }
`;

export const SPIN = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg);
    }
`;

export const FADE_IN = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
