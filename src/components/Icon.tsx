import { BsPencilSquare } from 'react-icons/bs';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { RiSendPlaneFill } from 'react-icons/ri';

const component = {
    pencil: BsPencilSquare,
    send: RiSendPlaneFill,
    up: FaArrowUp,
    down: FaArrowDown,
};

const sizes = {
    default: '24px',
    sm: '18px',
    lg: '30px',
};

const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
};

interface Props {
    variant?: keyof typeof component;
    size?: keyof typeof sizes;
    color?: keyof typeof colors;
}

export default function Icon(props: Props) {
    const { variant = 'up', size = 'default', color = 'primary' } = props;
    const Component = component[variant];

    return Component ? <Component size={sizes[size]} className={colors[color]} /> : null;
}
